import { Component, Input } from '@angular/core';
import { Campaign } from '../../../core/models/campaign.model';

@Component({
  standalone: false,
  selector: 'app-campaign-banner',
  templateUrl: './campaign-banner.component.html',
  styleUrls: ['./campaign-banner.component.scss']
})
export class CampaignBannerComponent {

  @Input() campaign!: Campaign;
}
