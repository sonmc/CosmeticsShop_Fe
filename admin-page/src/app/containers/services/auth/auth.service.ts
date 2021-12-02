import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_URL } from './../../constants/config';
import { LocalStorageService } from './../localStorage/local-storage.service';
import { ApiService } from './../api/api.service';
import { Employee } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private localStorageService: LocalStorageService, public httpClient: HttpClient, public apiService: ApiService) { }

  login = (username: string, password: string): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}user/login`;
      this.httpClient.post(url, { username, password })
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }

  logout = () => {
    this.localStorageService.delete('employee');
  }

  isLogin = () => {
    let user = this.localStorageService.get('employee'); 
    if (user && typeof user === 'object') {
      return  user['token'];
    }
    return false;
  }

  saveLocal = (employee: Employee) => {
    this.localStorageService.set('employee', employee);
  }

  getLocal = (): Employee => {
    return this.localStorageService.get('employee');
  }

  getToken = (): string => {
    let user = this.getLocal();
    return user ? user['token'] : null;
  }

  changePassword = (oldPassword, newPassword, confirmPassword, id) => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}user/change-password`;
      this.apiService.postWithToken(url, { oldPassword, newPassword, confirmPassword, id })
        .subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        })
    })
  }
}