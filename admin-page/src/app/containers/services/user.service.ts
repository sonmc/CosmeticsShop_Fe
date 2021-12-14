import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}users/get`;
    return this.apiService.getWithToken(url);
  }
  
  create = (user): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}users/create`;
      this.apiService.postWithToken(url, user).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  deactive = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}users/deactive?id=${id}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

}
