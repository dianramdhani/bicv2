import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BicComponent } from './page/bic/bic.component';


const routes: Routes = [
  { path: '', component: BicComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BicRoutingModule { }
