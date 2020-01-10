import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ShowImageComponent } from './component/show-image/show-image.component';
import { ListContainersComponent } from './component/list-containers/list-containers.component';

@NgModule({
  declarations: [ShowImageComponent, ListContainersComponent],
  imports: [
    CommonModule,
    NgbModule,
    MomentModule,
    DataTablesModule
  ],
  exports: [
    DataTablesModule,
    MomentModule,
    ReactiveFormsModule,
    NgbModule,

    ShowImageComponent,
    ListContainersComponent
  ],
  entryComponents: [
    ShowImageComponent
  ]
})
export class SharedModule { }