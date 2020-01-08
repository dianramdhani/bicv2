import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContainerRestService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  find() {
    return this.httpClient.get(`${this.url}/container`);
  }

  enter() {

  }

  update() {

  }
}