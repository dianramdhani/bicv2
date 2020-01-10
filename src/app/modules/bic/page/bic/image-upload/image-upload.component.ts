import { Component, Output, EventEmitter } from '@angular/core';

import { ContainerRestService } from '@data/service/container-rest.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
  @Output() refresh = new EventEmitter();
  fileSelected: { name: string, file: File, url: string } = {
    name: 'Choose file',
    file: null,
    url: ''
  };
  hasSelected = false;
  loading = false;

  constructor(private containerService: ContainerRestService) { }

  loadImg(event: any) {
    this.fileSelected.file = event.target.files[0] as File;
    this.fileSelected.name = this.fileSelected.file.name;
    const reader = new FileReader();
    reader.onload = e => {
      this.fileSelected.url = reader.result.toString();
      event.srcElement.value = null;
    };
    reader.readAsDataURL(this.fileSelected.file);
    this.hasSelected = true;
  }

  async upload() {
    this.loading = true;
    await this.containerService.enter(this.fileSelected.file).toPromise();
    this.loading = false;
    this.refresh.next();
    this.fileSelected.name = 'Choose file';
    this.hasSelected = false;
  }
}