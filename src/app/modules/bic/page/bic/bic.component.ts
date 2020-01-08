import { Component, OnInit } from '@angular/core';
import { ContainerRestService } from '@data/service/container-rest.service';

@Component({
  selector: 'app-bic',
  templateUrl: './bic.component.html',
  styleUrls: ['./bic.component.scss']
})
export class BicComponent implements OnInit {
  constructor(private containerService: ContainerRestService) { }

  ngOnInit() {
    this.containerService.find().subscribe(res => {
      console.log(res);
    });
  }
}