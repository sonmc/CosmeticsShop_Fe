import { Injectable } from '@angular/core';

import { Employee } from '../../models/user/user';
import { ApiService } from '../api/api.service';
import { API_URL } from '../../constants/config';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(public apiService: ApiService) { }

  convertUser = (info: Object): Employee => {
    let user = new Employee();
    user.employeeId = info['employeeId'];
    user.username = info['userName'];
    user.token = info['token'];
    return user;
  }

  get = (teamId, branchId) => {
    let url = `${API_URL}user/get?teamId=${teamId}&branchId=${branchId}`;
    return this.apiService.getWithToken(url);
  }
  create = (user): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}user/create`;
      this.apiService.postWithToken(url, user).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  deactive = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}user/deactive?id=${id}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

}
