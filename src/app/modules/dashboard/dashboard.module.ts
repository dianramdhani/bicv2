import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { GraphComponent } from './page/dashboard/graph/graph.component';
import { PieComponent } from './page/dashboard/pie/pie.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [DashboardComponent, GraphComponent, PieComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
