import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child } from '../../core/models/child.model';
import { VaccineDoseModule } from '../../core/models/vaccine.model';
import { ChildService } from '../../core/services/child.service';
import { VaccineService } from '../../core/services/vaccine.service';
import { ToastController } from '@ionic/angular';

interface AgeGroup {
  label: string;
  months: number;
  doses: VaccineDoseModule[];
}

@Component({
  standalone: false,
  selector: 'app-vaccine-history',
  templateUrl: './vaccine-history.page.html',
  styleUrls: ['./vaccine-history.page.scss']
})
export class VaccineHistoryPage implements OnInit, OnDestroy {

  selectedChild: Child | null = null;
  ageGroups: AgeGroup[] = [];
  hasDelayed = false;
  loading = true;
  activeFilter: string = 'TODAS';

  private allDoses: VaccineDoseModule[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private childService: ChildService,
    private vaccineService: VaccineService,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    const childSub = this.childService.selectedChild$.subscribe(child => {
      this.selectedChild = child;
      if (child && child.id) {
        this.loadDoses(child.id, child.ageInMonths);
      }
    });
    this.subscriptions.push(childSub);
  }

  private loadDoses(childId: string, ageInMonths: number): void {
    this.loading = true;
    const dosesSub = this.vaccineService.getDosesByChild(childId, ageInMonths)
      .subscribe(doses => {
        this.allDoses = doses;
        this.hasDelayed = doses.some(d => d.status === 'ATRASADA');
        this.applyFilter();
        this.loading = false;
      });
    this.subscriptions.push(dosesSub);
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
    this.applyFilter();
  }

  private applyFilter(): void {
    let filtered = this.allDoses;
    if (this.activeFilter !== 'TODAS') {
      filtered = this.allDoses.filter(d => d.status === this.activeFilter);
    }
    this.ageGroups = this.groupByAge(filtered);
  }

  async onMarkAsApplied(doseId: string): Promise<void> {
    try {
      await this.vaccineService.markAsApplied(doseId);
      const toast = await this.toastController.create({
        message: 'Vacina registrada como aplicada',
        duration: 2500,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    } catch (error) {
      console.error('Erro ao marcar vacina:', error);
      const toast = await this.toastController.create({
        message: 'Erro ao registrar vacina',
        duration: 2500,
        position: 'bottom',
        color: 'danger'
      });
      await toast.present();
    }
  }

  private groupByAge(doses: VaccineDoseModule[]): AgeGroup[] {
    const groupMap = new Map<number, VaccineDoseModule[]>();

    doses.forEach(dose => {
      const key = dose.targetAgeMonths;
      if (!groupMap.has(key)) {
        groupMap.set(key, []);
      }
      groupMap.get(key)!.push(dose);
    });

    const labels: Record<number, string> = {
      0: 'Ao Nascer',
      2: '2 Meses',
      3: '3 Meses',
      4: '4 Meses',
      5: '5 Meses',
      6: '6 Meses',
      9: '9 Meses',
      12: '12 Meses',
      15: '15 Meses',
      18: '18 Meses',
      24: '24 Meses',
      48: '4 Anos'
    };

    return Array.from(groupMap.entries())
      .sort(([a], [b]) => a - b)
      .map(([months, groupDoses]) => ({
        label: labels[months] || `${months} Meses`,
        months,
        doses: groupDoses
      }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
