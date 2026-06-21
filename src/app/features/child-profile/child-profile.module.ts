import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ChildProfilePage } from './child-profile.page';
import { ChildProfilePageRoutingModule } from './child-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildProfilePageRoutingModule,
    SharedModule
  ],
  declarations: [ChildProfilePage]
})
export class ChildProfilePageModule {}
