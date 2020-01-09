import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShowImageComponent } from './component/show-image/show-image.component';

@NgModule({
  declarations: [ShowImageComponent],
  imports: [
    CommonModule,
    NgbModule,
    MomentModule
  ],
  exports: [
    DataTablesModule,
    MomentModule,
    ReactiveFormsModule,
    NgbModule,

    ShowImageComponent
  ],
  entryComponents: [
    ShowImageComponent
  ]
})
export class SharedModule { }