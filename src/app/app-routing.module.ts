import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'child-profile',
    loadChildren: () => import('./features/child-profile/child-profile.module').then( m => m.ChildProfilePageModule)
  },
  {
    path: 'vaccine-history',
    loadChildren: () => import('./features/vaccine-history/vaccine-history.module').then( m => m.VaccineHistoryPageModule)
  },
  {
    path: 'campaigns',
    loadChildren: () => import('./features/campaigns/campaigns.module').then( m => m.CampaignsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
