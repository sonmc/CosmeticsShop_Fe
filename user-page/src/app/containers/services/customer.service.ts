import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}customers/get`;
    return this.apiService.getWithToken(url);
  }
  
  save = (customer: any, type: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}customers/${type}`; 
      this.apiService.postWithToken(url, customer).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 
  remove = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}customers/delete?id=${id}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 

}
