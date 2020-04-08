import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as Chart from 'chart.js';
import { Observable, Subject } from 'rxjs';

import { Capacity } from '@data/schema/capacity';
import { ContainerRestService } from '@data/service/container-rest.service';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @ViewChild('chart', { static: true }) ctx: ElementRef;
  @Input('date') dateSelected: Subject<string>;

  capacityObs: Observable<Capacity>;
  chart: Chart;

  constructor(
    private containerRestService: ContainerRestService
  ) { }

  ngOnInit() {
    this.chart = new Chart(this.ctx.nativeElement, {
      type: 'doughnut',
      options: {
        responsive: false,
        legend: {
          position: 'bottom'
        },
        cutoutPercentage: 80
      }
    });

    this.dateSelected.subscribe(date => {
      this.capacityObs = this.containerRestService.getCapacity(date);
      this.capacityObs.subscribe(capacity => {
        this.drawChart(capacity);
      });
    });
  }

  protected drawChart(capacity: Capacity) {
    const freeCapacity = +capacity.countPercent.replace('%', '');
    this.chart.data = {
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
    };
    this.chart.update();
  }
}