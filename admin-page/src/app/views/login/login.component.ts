import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ShareService } from '../../containers/services/share/share.service';
import { UserService } from '../../containers/services/user/user.service';
import { AuthService } from '../../containers/services/auth/auth.service';
import { Router } from '@angular/router';
import { SUCCESS_STATUS } from '../../containers/constants/config';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  
  formLogin: FormGroup;
  messageError: string; 

  constructor(public fb: FormBuilder, public authService: AuthService, public router: Router,
    public shareService: ShareService, public userService: UserService) {
 
    this.messageError = '';
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]]
    });
  }
   data = {
      message: "",
      data: {},
      status: 1
  }
  login = () => { 
   /* if (this.formLogin.valid) { 
      let value = this.formLogin.value;
      this.authService.login(value['username'], value['password'])
        .then(res => {
          if (res['status'] == SUCCESS_STATUS) { 
            let employee = res['data'];
            this.authService.saveLocal(employee);
            this.shareService.updateUser(this.userService.convertUser(employee));
            this.router.navigate(['/my-okr']);
          } else { 
            this.messageError = res['message']; 
          } 
        }).catch(e => { 
          window.alert('Connection Error !');
        })
    } */
    this.router.navigate(['/employee']);
  }
}
