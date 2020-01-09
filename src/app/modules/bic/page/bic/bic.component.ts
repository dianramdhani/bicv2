import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { ContainerRestService } from '@data/service/container-rest.service';

import { Container } from '@data/schema/container';

@Component({
  selector: 'app-bic',
  templateUrl: './bic.component.html',
  styleUrls: ['./bic.component.scss']
})
export class BicComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  containers: Container[];
  formFilter: FormGroup;

  constructor(private containerService: ContainerRestService) { }

  ngOnInit() {
    this.formFilter = new FormGroup({
      date1: new FormControl('', Validators.required),
      date2: new FormControl('', Validators.required)
    });

    this.dtOptions = {
      pagingType: 'simple_numbers',
      serverSide: true,
      processing: true,
      order: [[1, 'desc']],
      columnDefs: [{
        targets: 0,
        orderable: false
      }],
      searching: false,
      ajax: (dataTablesParameters: any, callback) => {
        this.containers = [];
        let sortBy = 'date',
          sortOrder = dataTablesParameters.order[0].dir,
          page = dataTablesParameters.start / dataTablesParameters.length,
          limit = dataTablesParameters.length,
          { date1, date2 } = this.formFilter.value;

        console.log(date1, date2);

        switch (dataTablesParameters.order[0].column) {
          case '1':
            sortBy = 'date';
            break;
          case '2':
            sortBy = 'code'
            break;
        }

        this.containerService.find(date1, date2, sortBy, sortOrder, page, limit).subscribe(res => {
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

  ngAfterViewInit() {
    this.dtTrigger.next();
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  filter() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }
}