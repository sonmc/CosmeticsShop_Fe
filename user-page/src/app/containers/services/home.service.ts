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

  getProduct = (brandId: any, dataSearch: string) => {
    let param = {
      branchId: brandId,
      dataSearch: dataSearch || '',
    };
    let url = `${API_URL}homes/products?brandId=${brandId}&search=${dataSearch}`;
    return this.apiService.post(url, param);
  };

  getProductById = (id: any) => {
    let url = `${API_URL}homes/products?id=${id}`;
    return this.apiService.get(url);
  };

  search = (composition: string) => {
    let url = `${API_URL}homes/search?=${composition}`;
    return this.apiService.get(url);
  };

  getCart = (user: any) => {
    let url = `${API_URL}homes/get-cart?userId=${user.userId}&clientIp=${user.clientIp}`;
    return this.apiService.post(url, user);
  };

  deleteOrderDetail = (id: any) => {
    let url = `${API_URL}homes/delete-cart?id=${id}`;
    return this.apiService.get(url);
  };
  updateUser= (user: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/update-user`;
      this.apiService.postWithToken(url, user).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err: any) => {
          reject(err);
        }
      );
    });
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

  addToCart = (cart: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/add-to-cart`;
      this.apiService.post(url, cart).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  createOrderDetail = (cart: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/add-to-cart`;
      this.apiService.post(url, cart).subscribe(
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
  getOrderByUserId = (userId: any, clientIp: string) => {
    let url = `${API_URL}homes/get-order-by-user?userId=${userId}&clientIp=${clientIp}`;
    return this.apiService.get(url);
  };

  getOrderDetailByOrderId = (orderId: any) => {
    let url = `${API_URL}homes/get-order-detail?orderId=${orderId}`;
    return this.apiService.get(url);
  };
}
