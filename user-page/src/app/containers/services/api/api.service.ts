import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LocalStorageService } from './../localStorage/local-storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public httpClient: HttpClient,
    public localStorageService: LocalStorageService
  ) {}

  get = (url: any) => {
    return this.httpClient.get(url);
  };

  post = (url: any, data: any) => {
    return this.httpClient.post(url, data);
  };

  postWithToken = (url: any, data: any): Observable<any> => {
    let user = this.localStorageService.get('user');
    let token = user ? user['token'] : null;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient.post(url, data, { headers });
  };

  getWithToken = (url: any): Observable<any> => {
    let user = this.localStorageService.get('user');
    let token = user ? user['token'] : null;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.httpClient.get(url, { headers });
  };

  uploadFileWithToken = (url: any, file: any): Observable<any> => {
    let user = this.localStorageService.get('user');
    let token = user ? user['token'] : null;
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    let form = new FormData();
    form.append('file', file);
    return this.httpClient.post(url, form, { headers });
  };
}
