import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Campaign } from '../../core/models/campaign.model';
import { CampaignService } from '../../core/services/campaign.service';

@Component({
  standalone: false,
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss']
})
export class CampaignsPage implements OnInit, OnDestroy {

  campaigns: Campaign[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    const sub = this.campaignService.getAllCampaigns().subscribe(campaigns => {
      this.campaigns = campaigns;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
