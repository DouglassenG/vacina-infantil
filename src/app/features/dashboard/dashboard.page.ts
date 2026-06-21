import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Child } from '../../core/models/child.model';
import { Campaign } from '../../core/models/campaign.model';
import { VaccineDoseModule } from '../../core/models/vaccine.model';
import { ChildService } from '../../core/services/child.service';
import { VaccineService } from '../../core/services/vaccine.service';
import { CampaignService } from '../../core/services/campaign.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {

  selectedChild: Child | null = null;
  doses: VaccineDoseModule[] = [];
  campaigns: Campaign[] = [];
  hasDelayed = false;

  concluidas = 0;
  agendadas = 0;
  atrasadas = 0;

  private subscriptions: Subscription[] = [];

  constructor(
    private childService: ChildService,
    private vaccineService: VaccineService,
    private campaignService: CampaignService
  ) {}

  ngOnInit(): void {
    const childSub = this.childService.selectedChild$.subscribe(child => {
      this.selectedChild = child;
      if (child && child.id) {
        this.loadDoses(child.id, child.ageInMonths);
        this.loadCampaigns(child.ageInMonths);
      }
    });
    this.subscriptions.push(childSub);
  }

  private loadDoses(childId: string, ageInMonths: number): void {
    const dosesSub = this.vaccineService.getDosesByChild(childId, ageInMonths)
      .subscribe(doses => {
        this.doses = doses;
        this.concluidas = doses.filter(d => d.status === 'CONCLUIDA').length;
        this.agendadas = doses.filter(d => d.status === 'AGENDADA').length;
        this.atrasadas = doses.filter(d => d.status === 'ATRASADA').length;
        this.hasDelayed = this.atrasadas > 0;
      });
    this.subscriptions.push(dosesSub);
  }

  private loadCampaigns(ageInMonths: number): void {
    const campSub = this.campaignService.getCampaignsForChild(ageInMonths)
      .subscribe(campaigns => {
        this.campaigns = campaigns;
      });
    this.subscriptions.push(campSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
