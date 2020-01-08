import { Component, OnInit } from '@angular/core';

import { ContainerRestService } from '@data/service/container-rest.service';

import { Container } from '@data/schema/container';

@Component({
  selector: 'app-bic',
  templateUrl: './bic.component.html',
  styleUrls: ['./bic.component.scss']
})
export class BicComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  containers: Container[] = [];

  constructor(private containerService: ContainerRestService) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      serverSide: true,
      processing: true,
      order: [[1, 'desc']],
      columnDefs: [{
        targets: 0,
        orderable: false
      }],
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        let sortBy = 'date',
          sortOrder = dataTablesParameters.order[0].dir,
          page = dataTablesParameters.start / dataTablesParameters.length,
          limit = dataTablesParameters.length;

        switch (dataTablesParameters.order[0].column) {
          case '1':
            sortBy = 'date';
            break;
          case '2':
            sortBy = 'code'
            break;
        }

        this.containerService.find('', '', sortBy, sortOrder, page, limit).subscribe(res => {
          this.containers = res.content;
          callback({
            recordsTotal: res.totalElements,
            recordsFiltered: res.totalElements,
            data: []
          });
        });
      }
    };
  }
}