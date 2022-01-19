import { Injectable } from '@angular/core'; 
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root'
})

export class CompositionService {
  constructor(public apiService: ApiService) { }

  
  get = () => {
    let url = `${API_URL}compositions/get`;
    return this.apiService.getWithToken(url);
  }
  
  save = (composition, type): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}compositions/${type}`;
      this.apiService.postWithToken(url, composition).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 
  remove = (composition): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}compositions/delete`;
      this.apiService.postWithToken(url, composition).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
 
  searchComposition = (name): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}compositions/search-by-name?name=${name}`;
      this.apiService.getWithToken(url).subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }
}
