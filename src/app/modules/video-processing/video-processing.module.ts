import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArchwizardModule } from 'angular-archwizard'

import { VideoProcessingRoutingModule } from './video-processing-routing.module';
import { VideoProcessingComponent } from './page/video-processing/video-processing.component';
import { SharedModule } from '@shared/shared.module';
import { VideoCaptureComponent } from './page/video-processing/video-capture/video-capture.component';
import { VideoSetupComponent } from './page/video-setup/video-setup.component';


@NgModule({
  declarations: [VideoProcessingComponent, VideoCaptureComponent, VideoSetupComponent],
  imports: [
    CommonModule,
    VideoProcessingRoutingModule,
    SharedModule,
    ArchwizardModule
  ]
})
export class VideoProcessingModule { }