import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, interval } from 'rxjs';

import { VideoRestService } from '@data/service/video-rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageCropperComponent } from '@shared/component/image-cropper/image-cropper.component';
import { CropperPosition } from 'ngx-image-cropper';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss']
})
export class VideoCaptureComponent implements OnInit {
  @Output() refresh = new EventEmitter();
  frameUrl: string = null;
  startVideo = new BehaviorSubject<boolean>(false);
  hasStarted: boolean;
  tick = 1000;

  constructor(private videoService: VideoRestService) { }

  async ngOnInit() {
    const { running } = await this.videoService.getStatus().toPromise();
    this.startVideo.next(running);

    this.initVideoPlayer();
  }

  private initVideoPlayer() {
    const timer = interval(this.tick);
    let timerSubscriber: Subscription;
    this.startVideo.subscribe(running => {
      if (running) {
        timerSubscriber = timer.subscribe(() => {
          this.frameUrl = this.videoService.getFrameUrl();
        });
      } else if (timerSubscriber) {
        timerSubscriber.unsubscribe();
      }
      this.hasStarted = running;
    });
  }

  async stop() {
    await this.videoService.stop().toPromise();
    this.startVideo.next(false)
  }
}