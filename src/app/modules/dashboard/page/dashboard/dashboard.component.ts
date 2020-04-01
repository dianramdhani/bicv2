import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ContainerRestService } from '@data/service/container-rest.service';
import { ContainerInOut } from '@data/schema/container-in-out';
import { BusiestLocation } from '@data/schema/busiest-location';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * Tutorial from: https://blog.angular-university.io/angular-reactive-templates/
   */
  busiestLocationObs: Observable<BusiestLocation>;
  containerInOutObs: Observable<ContainerInOut>;

  constructor(
    private containerRestService: ContainerRestService
  ) { }

  ngOnInit() {
    this.busiestLocationObs = this.containerRestService.getBusiestLocation();
    this.containerInOutObs = this.containerRestService.getContainerInOut();
  }

}
