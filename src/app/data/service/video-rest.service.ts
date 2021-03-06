import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CropperPosition } from 'ngx-image-cropper';

@Injectable({
  providedIn: 'root'
})
export class VideoRestService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  start(
    path: string,
    save: boolean = false,
    processingInterval: number = 1000,
    x1: number = -1,
    y1: number = -1,
    x2: number = -1,
    y2: number = -1
  ) {
    const params = new HttpParams()
      .set('path', path)
      .set('save', save.toString())
      .set('processingInterval', processingInterval.toString())
      .set('x1', x1.toString())
      .set('y1', y1.toString())
      .set('x2', x2.toString())
      .set('y2', y2.toString());
    return this.httpClient.get<any>(`${this.url}/video/start`, { params });
  }

  stop() {
    return this.httpClient.get(`${this.url}/video/stop`);
  }

  getFrameUrl() {
    return `${this.url}/video/frame?time=${(new Date()).toISOString()}`;
  }

  getStatus() {
    return this.httpClient.get<{ running: boolean }>(`${this.url}/video/status`);
  }

  getCrop() {
    return this.httpClient.get<CropperPosition>(`${this.url}/video/getCrop`);
  }

  crop(imagePosition: CropperPosition) {
    const params = new HttpParams()
      .set('x1', imagePosition.x1.toString())
      .set('y1', imagePosition.y1.toString())
      .set('x2', imagePosition.x2.toString())
      .set('y2', imagePosition.y2.toString());
    return this.httpClient.get<any>(`${this.url}/video/crop`, { params });
  }
}