import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
}