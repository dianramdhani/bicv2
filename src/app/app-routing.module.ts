import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('@modules/dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'video-processing', loadChildren: () => import('@modules/video-processing/video-processing.module').then(m => m.VideoProcessingModule) },
      { path: 'bic', loadChildren: () => import('@modules/bic/bic.module').then(m => m.BicModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
