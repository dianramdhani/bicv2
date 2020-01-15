import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CropperPosition, ImageCroppedEvent } from 'ngx-image-cropper';
import { Router, ActivatedRoute } from '@angular/router';

import { VideoRestService } from '@data/service/video-rest.service';

@Component({
  selector: 'app-video-setup',
  templateUrl: './video-setup.component.html',
  styleUrls: ['./video-setup.component.scss']
})
export class VideoSetupComponent implements OnInit {
  formVideo: FormGroup;
  tick = 1000;
  imagePosition: CropperPosition;
  imageFile: Blob;
  loadingImage = false;
  loadingApply = false;

  constructor(
    private videoService: VideoRestService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formVideo = new FormGroup({
      path: new FormControl('', Validators.required),
      save: new FormControl(false, Validators.required)
    });

    this.videoService.getStatus()
      .subscribe(running => {
        if (running) {
          this.removeFrame();
        }
      });
  }

  async getFrame() {
    this.loadingImage = true;
    const { path, save } = this.formVideo.value;
    await this.videoService.start(path, save, this.tick).toPromise();
    try {
      const res = await fetch(this.videoService.getFrameUrl()),
        blob = await res.blob();
      this.imageFile = blob;
    } catch (error) {
      console.error('error load image', error);
    }
    this.loadingImage = false;
  }

  removeFrame() {
    this.videoService.stop().toPromise();
  }

  imageCropped(event: ImageCroppedEvent) {
    this.imagePosition = event.imagePosition;
  }

  async apply() {
    this.loadingApply = true;
    await this.videoService.crop(this.imagePosition).toPromise();
    const { path, save } = this.formVideo.value;
    await this.videoService.start(path, save, this.tick).toPromise();
    this.loadingApply = false;
    this.router.navigate(['../'], { relativeTo: this.route, skipLocationChange: true });
  }
}