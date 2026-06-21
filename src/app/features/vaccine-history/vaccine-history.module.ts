import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { VaccineHistoryPage } from './vaccine-history.page';
import { VaccineHistoryPageRoutingModule } from './vaccine-history-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccineHistoryPageRoutingModule,
    SharedModule
  ],
  declarations: [VaccineHistoryPage]
})
export class VaccineHistoryPageModule {}
