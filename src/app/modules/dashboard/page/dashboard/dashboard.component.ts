import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ContainerRestService } from '@data/service/container-rest.service';
import { ContainerInOut } from '@data/schema/container-in-out';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * Tutorial from: https://blog.angular-university.io/angular-reactive-templates/
   */
  containerInOutObs: Observable<ContainerInOut>;

  constructor(
    private containerRestService: ContainerRestService
  ) { }

  ngOnInit() {
    this.containerInOutObs = this.containerRestService.getContainerInOut();
  }

}
