import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}products/get`;
    return this.apiService.getWithToken(url);
  }
  
  save = (product, type): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}products/${type}`; 
      this.apiService.postWithToken(url, product).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 
  remove = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}products/delete?id=${id}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 

}
