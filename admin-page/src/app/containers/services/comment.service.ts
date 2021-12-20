import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class CommentService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}comments/get`;
    return this.apiService.getWithToken(url);
  }
  
  save = (comment): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}comments/add`; 
      this.apiService.postWithToken(url, comment).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 
  remove = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}comments/delete?id=${id}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 

}
