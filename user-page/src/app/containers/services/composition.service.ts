import { Injectable } from '@angular/core';
import { ApiService } from './api/api.service';
import { API_URL } from '../constants/config';

@Injectable({
  providedIn: 'root',
})
export class CompositionService {
  constructor(public apiService: ApiService) {}

  get = () => {
    let url = `${API_URL}compositions/get`;
    return this.apiService.getWithToken(url);
  };
}
