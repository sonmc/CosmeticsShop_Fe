import { Injectable } from "@angular/core";
import { ApiService } from "./api/api.service";
import { API_URL } from "../constants/config";

@Injectable({
  providedIn: "root",
})
export class CartDetailService {
  constructor(public apiService: ApiService) {}

  getCartDetail = (cartId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orderDetails/get-order-details?orderId=${cartId}`;
      this.apiService.getWithToken(url).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  save = (cartDetail: any, type: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orderDetails/${type}`;
      this.apiService.postWithToken(url, cartDetail).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  remove = (id: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orderDetails/delete?id=${id}`;
      this.apiService.getWithToken(url).subscribe(
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
