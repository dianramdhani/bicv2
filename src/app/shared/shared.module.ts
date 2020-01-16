import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperModule } from 'ngx-image-cropper';
import { PinchZoomModule } from 'ngx-pinch-zoom';

import { ShowImageComponent } from './component/list-containers/show-image/show-image.component';
import { ListContainersComponent } from './component/list-containers/list-containers.component';
import { ImageCropperComponent } from './component/image-cropper/image-cropper.component';

@NgModule({
  declarations: [ShowImageComponent, ListContainersComponent, ImageCropperComponent],
  imports: [
    CommonModule,
    NgbModule,
    MomentModule,
    DataTablesModule,
    ReactiveFormsModule,
    ImageCropperModule,
    PinchZoomModule
  ],
  exports: [
    DataTablesModule,
    MomentModule,
    ReactiveFormsModule,
    NgbModule,
    ImageCropperModule,

    ListContainersComponent,
    ImageCropperComponent
  ],
  entryComponents: [
    ShowImageComponent,
    ImageCropperComponent
  ]
})
export class SharedModule { }