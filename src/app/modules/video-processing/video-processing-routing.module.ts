import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoProcessingComponent } from './page/video-processing/video-processing.component';


const routes: Routes = [
  { path: '', component: VideoProcessingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoProcessingRoutingModule { }
