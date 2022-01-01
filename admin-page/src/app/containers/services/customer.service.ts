import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}users/get-customer`;
    return this.apiService.getWithToken(url);
  }
  
  save = (customer, type): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}users/${type}`; 
      this.apiService.postWithToken(url, customer).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 
  remove = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}users/delete?id=${id}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 

}
