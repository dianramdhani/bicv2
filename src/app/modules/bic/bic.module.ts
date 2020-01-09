import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';

import { BicRoutingModule } from './bic-routing.module';
import { BicComponent } from './page/bic/bic.component';


@NgModule({
  declarations: [BicComponent],
  imports: [
    CommonModule,
    BicRoutingModule,
    DataTablesModule,
    MomentModule,
    ReactiveFormsModule
  ]
})
export class BicModule { }