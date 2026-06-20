import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildProfilePageRoutingModule } from './child-profile-routing.module';

import { ChildProfilePage } from './child-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildProfilePageRoutingModule
  ],
  declarations: [ChildProfilePage]
})
export class ChildProfilePageModule {}
