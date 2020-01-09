import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';
import { BicRoutingModule } from './bic-routing.module';
import { BicComponent } from './page/bic/bic.component';
import { ImageUploadComponent } from './page/bic/image-upload/image-upload.component';


@NgModule({
  declarations: [BicComponent, ImageUploadComponent],
  imports: [
    CommonModule,
    BicRoutingModule,
    SharedModule
  ]
})
export class BicModule { }