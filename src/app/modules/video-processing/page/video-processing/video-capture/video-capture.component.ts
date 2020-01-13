import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { VideoRestService } from '@data/service/video-rest.service';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss']
})
export class VideoCaptureComponent implements OnInit {
  formVideo: FormGroup;
  loading = false;

  constructor(private videoService: VideoRestService) { }

  ngOnInit() {
    this.formVideo = new FormGroup({
      path: new FormControl('', Validators.required),
      save: new FormControl(false, Validators.required)
    });
  }

  async start() {
    this.loading = true;
    const { path, save } = this.formVideo.value;
    await this.videoService.start(path, save).toPromise();
    this.loading = false;
  }
}