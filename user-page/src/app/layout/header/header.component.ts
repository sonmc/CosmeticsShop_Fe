import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';
import { HomeService } from 'src/app/containers/services/home.service';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { CommonService } from 'src/app/containers/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  currentUser: any = {};
  composition: string = '';
  constructor(
    public router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.currentUser = this.localStorageService.get('customer');
    this.composition = this.localStorageService.get('search');
  }
  changePage(page: string) {
    this.router.navigate([page]);
    this.localStorageService.set('search', '');
    this.composition = '';
  }

  search = () => {
    this.localStorageService.set('search', this.composition);
    window.location.reload();
  };

  logout = () => {
    this.localStorageService.delete('customer');
    this.router.navigate(['/home']);
    window.location.reload();
  };
}
