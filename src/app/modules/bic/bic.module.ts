import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { BicRoutingModule } from './bic-routing.module';
import { BicComponent } from './page/bic/bic.component';
import { ImageUploadComponent } from './page/bic/image-upload/image-upload.component';
import { ImageCropperComponent } from './page/bic/image-upload/image-cropper/image-cropper.component';


@NgModule({
  declarations: [
    BicComponent,
    ImageUploadComponent,
    ImageCropperComponent
  ],
  imports: [
    CommonModule,
    BicRoutingModule,
    SharedModule
  ],
  entryComponents: [
    ImageCropperComponent
  ]
})
export class BicModule { }