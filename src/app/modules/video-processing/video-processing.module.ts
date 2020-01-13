import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoProcessingRoutingModule } from './video-processing-routing.module';
import { VideoProcessingComponent } from './page/video-processing/video-processing.component';
import { SharedModule } from '@shared/shared.module';
import { VideoCaptureComponent } from './page/video-processing/video-capture/video-capture.component';


@NgModule({
  declarations: [VideoProcessingComponent, VideoCaptureComponent],
  imports: [
    CommonModule,
    VideoProcessingRoutingModule,
    SharedModule
  ]
})
export class VideoProcessingModule { }