import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccineHistoryPage } from './vaccine-history.page';

const routes: Routes = [
  {
    path: '',
    component: VaccineHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccineHistoryPageRoutingModule {}
