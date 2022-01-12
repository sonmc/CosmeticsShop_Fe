import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class CompositionService {
  constructor(public apiService: ApiService) {}

  get = () => {
    let url = `${API_URL}compositions/get`;
    return this.apiService.getWithToken(url);
  };
  search = (name: string) => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/search?name=${name}`;
      this.apiService.get(url).subscribe(
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
