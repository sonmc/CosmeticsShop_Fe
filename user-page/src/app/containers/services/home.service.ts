import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(public apiService: ApiService) {}

  getCategory = () => {
    let url = `${API_URL}homes/categories`;
    return this.apiService.get(url);
  };
  getBrand = (caId: any) => {
    let url = `${API_URL}homes/brands?categoryId=${caId}`;
    return this.apiService.get(url);
  };

  getProduct = (brandId: any) => {
    let url = `${API_URL}homes/products?id=${brandId}`;
    return this.apiService.get(url);
  };
}
