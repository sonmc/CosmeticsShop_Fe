import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public apiService: ApiService) {}

  register = (user: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}users/register`;
      this.apiService.post(url, user).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  login = (user: any) => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}users/login`;
      this.apiService.post(url, user).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
}
