import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildProfilePage } from './child-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ChildProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildProfilePageRoutingModule {}
