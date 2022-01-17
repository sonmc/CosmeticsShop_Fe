import { SUCCESS_STATUS } from './../../containers/constants/config';

import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/containers/services/home.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';
import { CommonService } from 'src/app/containers/services/common.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  messageConfirm: string = '';
  categories: any = [];
  products: any = [];
  brands: any = [];
  clientIp: any = '';
  currentUser: any = {};
  searchObj: any = {};
  constructor(
    private homeService: HomeService,
    public httpClient: HttpClient,
    private storageService: LocalStorageService,
    private commonService: CommonService,
    public router: Router
  ) {
    this.commonService.getClientIp().then((res: any) => {
      this.clientIp = res['ip'];
    });
    this.searchObj = this.storageService.get('search') || {
      key: '',
      value: '',
    };
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getBrand = (categoryId: any, indexSelected: number) => {
    this.homeService.getBrand(categoryId).subscribe((res: any) => {
      if (SUCCESS_STATUS == res['status']) {
        this.brands = res['data'].map((element: any) => {
          return { ...element, active: 'inactive' };
        });

        this.setActiveForCategory(indexSelected);
        this.getProduct(9999, 0);
      }
    });
  };

  getProduct = (brandId: any, indexSelected: number) => {
    this.homeService
      .getProduct(brandId, this.searchObj.value)
      .subscribe((res: any) => {
        if (SUCCESS_STATUS == res['status']) {
          this.setActiveForBrand(indexSelected);
          this.products = res['data'];
        }
      });
  };

  getCategory = () => {
    this.homeService.getCategory().subscribe((res: any) => {
      if (SUCCESS_STATUS == res['status']) {
        this.categories = res['data'].map((element: any) => {
          return { ...element, active: 'inactive' };
        });
        this.getBrand(9999, 0);
      }
    });
  };

  setActiveForBrand = (indexSelected: number) => {
    this.brands = this.brands.map((element: any, index: number) => {
      if (index + 1 == indexSelected) {
        return { ...element, active: 'activeList' };
      }
      return { ...element, active: 'inactive' };
    });
    if (indexSelected != 0) {
      $('#allBrand').removeClass('activeList');
      $('#allBrand').addClass('inactive');
    } else {
      $('#allBrand').addClass('activeList');
      $('#allBrand').removeClass('inactive');
    }
  };

  setActiveForCategory(indexSelected: number) {
    this.categories = this.categories.map((element: any, index: number) => {
      if (index + 1 == indexSelected) {
        return { ...element, active: 'activeList' };
      }
      return { ...element, active: 'inactive' };
    });
    if (indexSelected != 0) {
      $('#allCategory').removeClass('activeList');
      $('#allCategory').addClass('inactive');
    } else {
      $('#allCategory').addClass('activeList');
      $('#allCategory').removeClass('inactive');
    }
  }

  addToCart = (product: any) => {
    let customer = this.storageService.get('customer');
    let userId = null;
    if (customer) {
      userId = customer.id;
    }
    let cart = {
      quantity: 1,
      userId: userId,
      clientIp: this.clientIp,
      productId: product.id,
    };

    this.homeService.addToCart(cart).then((res: any) => {
      if (res['status'] == SUCCESS_STATUS) {
        $('#modalConfirm').modal('show');
        this.messageConfirm = 'Thêm vào giỏ hàng thành công!';
      }
    });
  };

  goDetail = (idDetail: any) => {
    this.router.navigate(['product-detail', idDetail]);
  };
}
