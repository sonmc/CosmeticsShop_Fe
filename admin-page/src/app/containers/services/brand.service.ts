import { Injectable } from "@angular/core";
import { ApiService } from "./api/api.service";
import { API_URL } from "../constants/config";

@Injectable({
  providedIn: "root",
})
export class BrandService {
  constructor(public apiService: ApiService) {}

  getByCategoryId = (categoryId) => {
    let url = `${API_URL}brands/getByCategoryId?categoryId=${categoryId}`;
    return this.apiService.getWithToken(url);
  };

  save = (brand, type): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}brands/${type}`;
      this.apiService.postWithToken(url, brand).subscribe(
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
      let url = `${API_URL}brands/delete?id=${id}`;
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
