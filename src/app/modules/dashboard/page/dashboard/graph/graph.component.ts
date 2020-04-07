import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';
import * as moment from 'moment';

import { ContainerRestService } from '@data/service/container-rest.service';
import { ContainerDirection } from '@data/schema/container-direction';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  @ViewChild('chart', { static: true }) ctx: ElementRef;
  chart: Chart;
  timeIndexSelected: number = 2;
  readonly date2 = moment().format('YYYY-MM-DD');
  times = [
    {
      label: 'Last week',
      date1: moment().subtract(7, 'day').format('YYYY-MM-DD')
    },
    {
      label: 'Last month',
      date1: moment().subtract(1, 'month').format('YYYY-MM-DD')
    },
    {
      label: 'Last 3 month',
      date1: moment().subtract(3, 'month').format('YYYY-MM-DD')
    },
    {
      label: 'Last year',
      date1: moment().subtract(1, 'year').format('YYYY-MM-DD')
    },
  ];

  constructor(
    private containerRestService: ContainerRestService
  ) { }

  ngOnInit() {
    this.chart = new Chart(this.ctx.nativeElement, {
      type: 'line',
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
    this.changeTime();
  }

  protected drawChart(containers: ContainerDirection[]) {
    this.chart.data = {
      datasets: [
        {
          label: 'In',
          data: containers
            .filter(container => container.location === 'In')
            .map(container => ({ t: new Date(container.date), y: container.count })),
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)'
        },
        {
          label: 'Out',
          data: containers
            .filter(container => container.location === 'Out')
            .map(container => ({ t: new Date(container.date), y: container.count })),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)'
        }
      ]
    };
    this.chart.update();
  }

  changeTime() {
    this.containerRestService.groupByDirectionDate(this.times[this.timeIndexSelected].date1, this.date2)
      .subscribe(containers => {
        this.drawChart(containers);
      });
  }
}