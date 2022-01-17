import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';
import { CommonService } from 'src/app/containers/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
  currentUser: any = null;
  composition: string = '';
  message: string = '';
  page: string = '';
  constructor(
    public router: Router,
    private commonService: CommonService,
    private localStorageService: LocalStorageService
  ) {
    this.currentUser = this.localStorageService.get('customer');
    this.composition = this.localStorageService.get('search');

  }

  ngOnInit() {
    this.commonService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });

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
