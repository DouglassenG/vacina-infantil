import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ChildSelectorComponent } from './components/child-selector/child-selector.component';
import { VaccineCardComponent } from './components/vaccine-card/vaccine-card.component';
import { CampaignBannerComponent } from './components/campaign-banner/campaign-banner.component';

@NgModule({
  declarations: [
    ChildSelectorComponent,
    VaccineCardComponent,
    CampaignBannerComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ChildSelectorComponent,
    VaccineCardComponent,
    CampaignBannerComponent
  ]
})
export class SharedModule {}
