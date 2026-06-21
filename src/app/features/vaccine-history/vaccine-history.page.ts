import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child } from '../../core/models/child.model';
import { VaccineDoseModule } from '../../core/models/vaccine.model';
import { ChildService } from '../../core/services/child.service';
import { VaccineService } from '../../core/services/vaccine.service';

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

  private subscriptions: Subscription[] = [];

  constructor(
    private childService: ChildService,
    private vaccineService: VaccineService
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
    const dosesSub = this.vaccineService.getDosesByChild(childId, ageInMonths)
      .subscribe(doses => {
        this.hasDelayed = doses.some(d => d.status === 'ATRASADA');
        this.ageGroups = this.groupByAge(doses);
      });
    this.subscriptions.push(dosesSub);
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
