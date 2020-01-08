import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoProcessingRoutingModule } from './video-processing-routing.module';
import { VideoProcessingComponent } from './page/video-processing/video-processing.component';


@NgModule({
  declarations: [VideoProcessingComponent],
  imports: [
    CommonModule,
    VideoProcessingRoutingModule
  ]
})
export class VideoProcessingModule { }
