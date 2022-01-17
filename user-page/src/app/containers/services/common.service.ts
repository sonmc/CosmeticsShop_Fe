import { API_URL } from './../constants/config';
import { ApiService } from './api/api.service';
import { Injectable } from '@angular/core'; 
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  currentUser = new Rx.Subject();
  currentPage = new Rx.Subject();

  constructor(public apiService: ApiService) {}

  changeData(data: any) {
    this.currentUser.next(data);
  }
  
  changePage(page: any) {
    this.currentPage.next(page);
  }

  upload = (file: any): Promise<Object> => {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', file, file.name);
      let url = `${API_URL}common/upload`;
      this.apiService.post(url, formData).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  };

  getClientIp = (): Promise<Object> => {
    return new Promise((resolve, reject) => {
      this.apiService.get('http://api.ipify.org/?format=json').subscribe(
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
