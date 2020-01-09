import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ContainerRestService } from '@data/service/container-rest.service';
import { Container } from '@data/schema/container';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.component.html',
  styleUrls: ['./show-image.component.scss']
})
export class ShowImageComponent {
  @Input() container: Container;

  constructor(
    public activeModal: NgbActiveModal,
    private containerService: ContainerRestService
  ) { }
}