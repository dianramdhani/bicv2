import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BicRoutingModule } from './bic-routing.module';
import { BicComponent } from './page/bic/bic.component';


@NgModule({
  declarations: [BicComponent],
  imports: [
    CommonModule,
    BicRoutingModule
  ]
})
export class BicModule { }
