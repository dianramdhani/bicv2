import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ContainerRestService } from '@data/service/container-rest.service';
import { Container } from '@data/schema/container';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent implements OnInit {
  @Input() container: Container;
  @Output() refresh: EventEmitter<any> = new EventEmitter();
  showEdit = false;
  formEdit: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private containerService: ContainerRestService
  ) { }

  ngOnInit() {
    this.formEdit = new FormGroup({
      id: new FormControl(this.container.id, Validators.required),
      date: new FormControl(this.container.date, Validators.required),
      code: new FormControl(this.container.code, Validators.required)
    });
  }

  async save() {
    const { id, date, code } = this.formEdit.value;
    await this.containerService.update(id, date, code).toPromise();
    this.activeModal.dismiss();
    this.refresh.next();
  }
}