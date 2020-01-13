import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, interval } from 'rxjs';

import { VideoRestService } from '@data/service/video-rest.service';

@Component({
  selector: 'app-video-capture',
  templateUrl: './video-capture.component.html',
  styleUrls: ['./video-capture.component.scss']
})
export class VideoCaptureComponent implements OnInit {
  @Output() refresh = new EventEmitter();
  loading = false;
  formVideo: FormGroup;
  frameUrl: string = null;
  startSubject = new BehaviorSubject<boolean>(false);
  hasStarted: boolean;
  tick = 1000;

  constructor(private videoService: VideoRestService) { }

  async ngOnInit() {
    this.formVideo = new FormGroup({
      path: new FormControl('', Validators.required),
      save: new FormControl(false, Validators.required)
    });

    const { running } = await this.videoService.getStatus().toPromise();
    this.startSubject.next(running);

    this.videoPlayer();
  }

  private videoPlayer() {
    const timer = interval(this.tick);
    let subscription: Subscription;
    this.startSubject.subscribe(status => {
      this.hasStarted = status;
      const { save } = this.formVideo.value;
      if (status) {
        subscription = timer.subscribe(() => {
          this.frameUrl = this.videoService.getFrameUrl();
          if (save) {
            this.refresh.next();
          }
        });
      } else if (subscription) {
        subscription.unsubscribe();
      }
    });
  }

  async start() {
    this.loading = true;
    const { path, save } = this.formVideo.value;
    await this.videoService.start(path, save, this.tick).toPromise();
    this.loading = false;
    this.frameUrl = null;
    this.startSubject.next(true);
  }

  async stop() {
    await this.videoService.stop().toPromise();
    this.startSubject.next(false)
  }
}