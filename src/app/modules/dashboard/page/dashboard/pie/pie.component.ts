import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {
  @ViewChild('chart', { static: true }) ctx: ElementRef;

  constructor() { }

  ngOnInit() {
    this.drawChart();
  }

  protected drawChart() {
    const chart = new Chart(this.ctx.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [
            52,
            48,
          ],
          backgroundColor: [
            '#007bff',
            '#97a3b9',
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
        }
      }
    });
  }
}