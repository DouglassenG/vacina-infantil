import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccineHistoryPageRoutingModule } from './vaccine-history-routing.module';

import { VaccineHistoryPage } from './vaccine-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccineHistoryPageRoutingModule
  ],
  declarations: [VaccineHistoryPage]
})
export class VaccineHistoryPageModule {}
