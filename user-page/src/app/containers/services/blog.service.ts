import { Injectable } from "@angular/core";
import { ApiService } from "./api/api.service";
import { API_URL } from "../constants/config";

@Injectable({
  providedIn: "root",
})
export class BlogService {
  constructor(public apiService: ApiService) {}

  get = () => {
    let url = `${API_URL}blogs/get`;
    return this.apiService.getWithToken(url);
  };

  getBlogDetail = (blogId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}blogs/getById?blogId=${blogId}`;
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

  save = (blog: any, type: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}blogs/${type}`;
      this.apiService.postWithToken(url, blog).subscribe(
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
      let url = `${API_URL}blogs/delete?id=${id}`;
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
