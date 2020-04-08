import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as moment from 'moment';

import { ContainerRestService } from '@data/service/container-rest.service';
import { ContainerInOut } from '@data/schema/container-in-out';
import { BusiestLocation } from '@data/schema/busiest-location';
import { ContainerData } from '@data/schema/container-data';
import { Capacity } from '@data/schema/capacity';

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
  capacityObs: Observable<Capacity>;
  containerDataObs: Observable<ContainerData[]>;

  dateInit = new Date();
  dateSelected = new Subject<string>();

  constructor(
    private containerRestService: ContainerRestService
  ) { }

  ngOnInit() {
    this.containerDataObs = this.containerRestService.groupByOwner();

    this.dateSelected.subscribe(date => {
      this.busiestLocationObs = this.containerRestService.getBusiestLocation(date);
      this.containerInOutObs = this.containerRestService.getContainerInOut(date);
      this.capacityObs = this.containerRestService.getCapacity(date);
    });

    setTimeout(() => this.dateChange(), 500);
  }

  dateChange(event: string = null) {
    if (!event) {
      this.dateSelected.next(moment(this.dateInit).format('YYYY-MM-DD'));
    } else {
      this.dateSelected.next(moment(event).format('YYYY-MM-DD'));
    }
  }
}