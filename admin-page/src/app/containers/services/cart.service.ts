import { Injectable } from "@angular/core";
import { ApiService } from "./api/api.service";
import { API_URL } from "../constants/config";

@Injectable({
  providedIn: "root",
})
export class CartService {
  constructor(public apiService: ApiService) {}

  get = () => {
    let url = `${API_URL}orders/get-orders`;
    return this.apiService.getWithToken(url);
  };

  searchOrderBySdt = (sdt): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orders/searchOrderBySdt?sdt=${sdt}`;
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
  edit = (cart): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orders/update-order`;
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

  remove = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orders/delete?id=${id}`;
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

  cancelOrder = (id): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}orders/cancel-order?id=${id}`;
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
