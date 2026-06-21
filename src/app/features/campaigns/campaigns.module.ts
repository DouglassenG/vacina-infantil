import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CampaignsPage } from './campaigns.page';
import { CampaignsPageRoutingModule } from './campaigns-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CampaignsPageRoutingModule,
    SharedModule
  ],
  declarations: [CampaignsPage]
})
export class CampaignsPageModule {}
