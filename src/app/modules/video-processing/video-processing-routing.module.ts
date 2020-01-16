import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoProcessingComponent } from './page/video-processing/video-processing.component';
import { VideoSetupComponent } from './page/video-setup/video-setup.component';


const routes: Routes = [
  { path: '', component: VideoProcessingComponent },
  { path: 'video-setup', component: VideoSetupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoProcessingRoutingModule { }
