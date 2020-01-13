import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ContainerRestService } from '@data/service/container-rest.service';
import { Container } from '@data/schema/container'
import { ShowImageComponent } from '../show-image/show-image.component';

@Component({
  selector: 'app-list-containers',
  templateUrl: './list-containers.component.html',
  styleUrls: ['./list-containers.component.scss']
})
export class ListContainersComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() fetchRefreshFn = new EventEmitter<Function>();
  @ViewChild(DataTableDirective, { static: false }) dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  containers: Container[];
  formFilter: FormGroup;

  constructor(
    private containerService: ContainerRestService,
    private modalService: NgbModal
  ) { }

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
    this.fetchRefreshFn.emit(() => this.refresh());
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  refresh() {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.dtTrigger.next();
    });
  }

  showImage(container: Container, event: MouseEvent) {
    const modalRef = this.modalService.open(ShowImageComponent);
    modalRef.componentInstance.container = container;
    modalRef.componentInstance.refresh.subscribe(() => this.refresh());
  }
}
