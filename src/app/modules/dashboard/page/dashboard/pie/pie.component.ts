import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable } from 'rxjs';

import { Capacity } from '@data/schema/capacity';
import { ContainerRestService } from '@data/service/container-rest.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @ViewChild('chart', { static: true }) ctx: ElementRef;

  capacityObs: Observable<Capacity>;

  constructor(
    private containerRestService: ContainerRestService
  ) { }

  ngOnInit() {
    this.capacityObs = this.containerRestService.getCapacity();

    this.capacityObs.subscribe(capacity => {
      this.drawChart(capacity);
    });
  }

  protected drawChart(capacity: Capacity) {
    const freeCapacity = +capacity.countPercent.replace('%', '');

    const chart = new Chart(this.ctx.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            100 - freeCapacity,
            freeCapacity,
          ],
          backgroundColor: [
            '#97a3b9',
            '#007bff',
          ]
        }],
        labels: [
          'Occupied',
          'Free Capacity',
        ]
      },
      options: {
        responsive: false,
        legend: {
          position: 'bottom'
        },
        cutoutPercentage: 80
      }
    });
  }
}