import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Table } from '@data/schema/table';
import { Container } from '@data/schema/container';

@Injectable({
  providedIn: 'root'
})
export class ContainerRestService {
  private url: string;

  constructor(private httpClient: HttpClient) {
    const config = window['config']();
    this.url = config.api;
  }

  find(
    date1: string = '',
    date2: string = '',
    sortBy: string = 'date',
    sortOrder: string = 'DESC',
    page: number = 0,
    limit: number = 10
  ) {
    const params = new HttpParams()
      .set('date1', date1)
      .set('date2', date2)
      .set('sortBy', sortBy)
      .set('sortOrder', sortOrder)
      .set('page', page.toString())
      .set('limit', limit.toString());
    return this.httpClient.get<Table<Container>>(`${this.url}/container`, { params });
  }

  imageUrl(id: string) {
    return `${this.url}/image/${id}.png`;
  }

  enter(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post(`${this.url}/container`, formData);
  }

  update() {

  }
}