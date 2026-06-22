import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child } from '../../core/models/child.model';
import { ChildService } from '../../core/services/child.service';

@Component({
  standalone: false,
  selector: 'app-child-profile',
  templateUrl: './child-profile.page.html',
  styleUrls: ['./child-profile.page.scss']
})
export class ChildProfilePage implements OnInit, OnDestroy {

  selectedChild: Child | null = null;
  showForm = false;
  saving = false;

  newChild = {
    name: '',
    birthDate: '',
    gender: 'M' as 'M' | 'F'
  };

  private subscriptions: Subscription[] = [];

  constructor(private childService: ChildService) {}

  ngOnInit(): void {
    const sub = this.childService.selectedChild$.subscribe(child => {
      this.selectedChild = child;
    });
    this.subscriptions.push(sub);
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  async saveChild(): Promise<void> {
    if (!this.newChild.name || !this.newChild.birthDate) {
      return;
    }

    this.saving = true;

    try {
      await this.childService.addChild({
        name: this.newChild.name,
        birthDate: new Date(this.newChild.birthDate),
        gender: this.newChild.gender
      }, 'parent1');

      this.resetForm();
      this.showForm = false;
    } catch (error) {
      console.error('Erro ao salvar crianca:', error);
    } finally {
      this.saving = false;
    }
  }

  private resetForm(): void {
    this.newChild = { name: '', birthDate: '', gender: 'M' };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
