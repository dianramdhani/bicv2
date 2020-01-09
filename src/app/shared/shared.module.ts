import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { MomentModule } from 'ngx-moment';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    DataTablesModule,
    MomentModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }