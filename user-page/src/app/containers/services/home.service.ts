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
    let url = `${API_URL}homes/products?brandId=${brandId}`;
    return this.apiService.get(url);
  };

  createCustomer = (customer: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/create-customer`;
      this.apiService.postWithToken(url, customer).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  createOrder = (cart: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/create-order`;
      this.apiService.postWithToken(url, cart).subscribe(
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
