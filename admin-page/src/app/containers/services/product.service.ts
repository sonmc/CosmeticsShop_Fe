import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}products/get-all`;
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
 
  remove = (product): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}products/edit`;
      this.apiService.postWithToken(url, product).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 

}
