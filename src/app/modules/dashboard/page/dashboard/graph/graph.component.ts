import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';

import { ContainerRestService } from '@data/service/container-rest.service';
import { ContainerDirection } from '@data/schema/container-direction';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @ViewChild('chart', { static: true }) ctx: ElementRef;

  constructor(
    private containerRestService: ContainerRestService
  ) { }

  ngOnInit() {
    this.containerRestService.groupByDirectionDate()
      .subscribe(containers => {
        this.drawChart(containers);
      });
  }

  protected drawChart(containers: ContainerDirection[]) {
    console.log(containers, containers
      .filter(container => container.location === 'In')
      .map(container => ({ x: new Date(container.date), y: container.count })));
    const chart = new Chart(this.ctx.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Out',
            data: containers
              .filter(container => container.location === 'Out')
              .map(container => ({ t: new Date(container.date), y: container.count })),
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)'
          },
          {
            label: 'In',
            data: containers
              .filter(container => container.location === 'In')
              .map(container => ({ t: new Date(container.date), y: container.count })),
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)'
          }
        ]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }]
        }
      }
    });
  }
}