import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(public apiService: ApiService) {}

  get = () => {
    let url = `${API_URL}products/get-all`;
    return this.apiService.get(url);
  };
}
