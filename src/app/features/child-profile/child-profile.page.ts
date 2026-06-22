import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child } from '../../core/models/child.model';
import { ChildService } from '../../core/services/child.service';
import { AlertController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-child-profile',
  templateUrl: './child-profile.page.html',
  styleUrls: ['./child-profile.page.scss']
})
export class ChildProfilePage implements OnInit, OnDestroy {

  selectedChild: Child | null = null;
  children: Child[] = [];
  showForm = false;
  isEditing = false;
  saving = false;

  formChild = {
    name: '',
    birthDate: '',
    gender: 'M' as 'M' | 'F'
  };

  private subscriptions: Subscription[] = [];

  constructor(
    private childService: ChildService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    const childSub = this.childService.selectedChild$.subscribe(child => {
      this.selectedChild = child;
    });
    this.subscriptions.push(childSub);

    const childrenSub = this.childService.getChildrenByParent('parent1')
      .subscribe(children => {
        this.children = children;
      });
    this.subscriptions.push(childrenSub);
  }

  openAddForm(): void {
    this.isEditing = false;
    this.formChild = { name: '', birthDate: '', gender: 'M' };
    this.showForm = true;
  }

  openEditForm(): void {
    if (!this.selectedChild) return;

    this.isEditing = true;
    const date = new Date(this.selectedChild.birthDate);
    const dateStr = date.toISOString().split('T')[0];

    this.formChild = {
      name: this.selectedChild.name,
      birthDate: dateStr,
      gender: this.selectedChild.gender
    };
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.isEditing = false;
    this.formChild = { name: '', birthDate: '', gender: 'M' };
  }

  async saveChild(): Promise<void> {
    if (!this.formChild.name || !this.formChild.birthDate) return;

    this.saving = true;

    try {
      if (this.isEditing && this.selectedChild?.id) {
        await this.childService.updateChild(this.selectedChild.id, {
          name: this.formChild.name,
          birthDate: new Date(this.formChild.birthDate),
          gender: this.formChild.gender
        });
      } else {
        await this.childService.addChild({
          name: this.formChild.name,
          birthDate: new Date(this.formChild.birthDate),
          gender: this.formChild.gender
        }, 'parent1');
      }

      this.closeForm();
    } catch (error) {
      console.error('Erro ao salvar crianca:', error);
    } finally {
      this.saving = false;
    }
  }

  async confirmDelete(): Promise<void> {
    if (!this.selectedChild?.id) return;

    const alert = await this.alertController.create({
      header: 'Confirmar exclusao',
      message: `Deseja realmente excluir o perfil de ${this.selectedChild.name}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.deleteChild();
          }
        }
      ]
    });

    await alert.present();
  }

  private async deleteChild(): Promise<void> {
    if (!this.selectedChild?.id) return;

    try {
      await this.childService.deleteChild(this.selectedChild.id);
      this.selectedChild = null;

      if (this.children.length > 0) {
        this.childService.selectChild(this.children[0]);
      }
    } catch (error) {
      console.error('Erro ao excluir crianca:', error);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
