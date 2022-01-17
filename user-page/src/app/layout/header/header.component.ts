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
  searchObj: any = { key: '', value: '' };
  message: string = '';
  page: any = null;

  constructor(
    public router: Router,
    private commonService: CommonService,
    private localStorageService: LocalStorageService
  ) {
    this.currentUser = this.localStorageService.get('customer');
    this.searchObj = this.localStorageService.get('search') || {
      key: '',
      value: '',
    };
  }

  ngOnInit() {
    this.commonService.currentUser.subscribe((data) => {
      this.currentUser = data;
    });
    this.commonService.currentPage.subscribe((page) => {
      this.page = page;
      console.log(this.page);
    });
  }

  changePage(page: string) {
    this.router.navigate([page]);
    this.commonService.changePage(page);
    this.localStorageService.set('search', '');
    this.searchObj = { key: '', value: '' };
  }

  search = () => {
    this.searchObj = {
      key: this.page,
      value: this.searchObj.value,
    };
    this.localStorageService.set('search', this.searchObj);
    window.location.reload();
  };

  logout = () => {
    this.localStorageService.delete('customer');
    this.router.navigate(['/home']);
    window.location.reload();
  };
}
