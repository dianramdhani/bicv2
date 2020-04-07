import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Table } from '@data/schema/table';
import { Container } from '@data/schema/container';
import { ContainerInOut } from '@data/schema/container-in-out';
import { BusiestLocation } from '@data/schema/busiest-location';
import { ContainerData } from '@data/schema/container-data';
import { Capacity } from '@data/schema/capacity';
import { ContainerDirection } from '@data/schema/container-direction';

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

  update(id: string, date: string, code: string) {
    return this.httpClient.put(`${this.url}/container`, { id, date, code });
  }

  getBusiestLocation(date: string = null) {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    return this.httpClient.get<BusiestLocation>(`${this.url}/container/busiestLocation`, { params });
  }

  getCapacity(date: string = null) {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    return this.httpClient.get<Capacity>(`${this.url}/container/capacity`, { params });
  }

  getContainerInOut(date: string = null) {
    let params = new HttpParams();
    if (date) {
      params = params.set('date', date);
    }
    return this.httpClient.get<ContainerInOut>(`${this.url}/container/containerInOut`, { params });
  }

  groupByOwner(date1: string = null, date2: string = null) {
    let params = new HttpParams();
    if (date1) {
      params = params.set('date1', date1);
    }
    if (date2) {
      params = params.set('date2', date2);
    }
    return this.httpClient.get<ContainerData[]>(`${this.url}/container/groupByOwner`, { params });
  }

  groupByDirectionDate(date1: string = null, date2: string = null) {
    let params = new HttpParams();
    if (date1) {
      params = params.set('date1', date1);
    }
    if (date2) {
      params = params.set('date2', date2);
    }
    return this.httpClient.get<ContainerDirection[]>(`${this.url}/container/groupByDirectionDate`, { params });
  }
}