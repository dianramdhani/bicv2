import { Component } from '@angular/core';

@Component({
  selector: 'app-video-processing',
  templateUrl: './video-processing.component.html',
  styleUrls: ['./video-processing.component.scss']
})
export class VideoProcessingComponent {
  refresh: Function;

  fetchRefreshFn(refresh: Function) {
    this.refresh = refresh;
  }
}