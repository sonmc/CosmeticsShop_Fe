import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { UserService } from 'src/app/containers/services/user.service';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  user: any = {
    username: '',
    email: '',
    password: '',
  };
  constructor(
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}

  register = () => {
    this.userService.register(this.user).then((res: any) => {
      if (res['status'] == SUCCESS_STATUS) {
        this.localStorageService.set('customer', {
          id: res.data.id,
          username: res.data.userName,
          token: res.data.token,
        });
        this.router.navigate(['/home']);
      }
    });
  };

  login = () => {
    this.userService.login(this.user).then((res: any) => {
      if (res['status'] == SUCCESS_STATUS) {
        this.localStorageService.set('customer', {
          id: res.data.id,
          username: res.data.userName,
          token: res.data.token,
        });
        this.router.navigate(['/home']);
      }
    });
  };
}
