import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(public apiService: ApiService) {}

  get = (title: string) => {
    let url = `${API_URL}homes/get-blog?title=${title}`;
    return this.apiService.get(url);
  };

  getBlogDetail = (blogId: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/getBlogById?blogId=${blogId}`;
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
  addComment = (comment: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      let url = `${API_URL}homes/createComment`;
      this.apiService.post(url, comment).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };
  getComments = (blogId: number) => {
    let url = `${API_URL}homes/getByBlogId?blogId=${blogId}`;
    return this.apiService.getWithToken(url);
  };
}
