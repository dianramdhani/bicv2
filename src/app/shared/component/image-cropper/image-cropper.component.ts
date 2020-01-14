import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCroppedEvent, CropperPosition } from 'ngx-image-cropper';

import { VideoRestService } from '@data/service/video-rest.service';

@Component({
  selector: 'app-image-cropper',
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.scss']
})
export class ImageCropperComponent implements OnInit {
  @Input() imageUrl: string;
  @Output() crop = new EventEmitter<CropperPosition>();
  imageFile: Blob;
  lastCropperEvent: ImageCroppedEvent;

  constructor(public activeModal: NgbActiveModal) { }

  async ngOnInit() {
    this.setImageFile(this.imageUrl);
  }

  private async setImageFile(url: string) {
    try {
      const res = await fetch(url),
        blob = await res.blob();
      this.imageFile = blob;
    } catch (error) {
      console.error('error load image', error);
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.lastCropperEvent = event;
  }

  apply() {
    this.crop.next(this.lastCropperEvent.imagePosition);
    this.activeModal.dismiss();
  }
}