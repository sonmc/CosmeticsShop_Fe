import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Employee } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})

export class ShareService {
  private userBehavior = new BehaviorSubject(new Employee());
  public user = this.userBehavior.asObservable();

  updateUser = (data: Employee) => {
    this.userBehavior.next(data);
  }
}
