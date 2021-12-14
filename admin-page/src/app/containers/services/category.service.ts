import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}categories/get`;
    return this.apiService.getWithToken(url);
  }
  
  save = (category, type): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}categories/${type}`; 
      this.apiService.postWithToken(url, category).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 
  remove = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}categories/delete?id=${id}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 

}
