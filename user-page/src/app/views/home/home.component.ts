import { SUCCESS_STATUS } from './../../containers/constants/config';

import { Component, OnInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/containers/services/home.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
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
  dataSearch: any = '';
  constructor(
    private homeService: HomeService,
    public httpClient: HttpClient,
    private storageService: LocalStorageService,
    private toastr: ToastrService,
    private commonService: CommonService,
    public router: Router
  ) {
    this.commonService.getClientIp().then((res: any) => {
      this.clientIp = res['ip'];
    });
    this.dataSearch = this.storageService.get('search') || '';
  }

  ngOnInit(): void {
    this.getCategory();
  }

  getBrand = (categoryId: any, indexSelected: number) => {
    this.homeService.getBrand(categoryId).subscribe((res: any) => {
      if (SUCCESS_STATUS == res['status']) {
        this.brands = res['data'].map((element: any, index: number) => {
          if (index == 0) {
            return { ...element, active: 'activeList' };
          }
          return { ...element, active: 'inactive' };
        });
        this.setActiveForCategory(indexSelected);
        this.getProduct(this.brands[0].brandId, 0);
      }
    });
  };

  getProduct = (brandId: any, indexSelected: number) => {
    this.homeService
      .getProduct(brandId, this.dataSearch)
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
        this.categories = res['data'].map((element: any, index: number) => {
          if (index == 0) {
            return { ...element, active: 'activeList' };
          }
          return { ...element, active: 'inactive' };
        });
        this.getBrand(this.categories[0].id, 0);
      }
    });
  };

  setActiveForBrand = (indexSelected: number) => {
    this.brands = this.brands.map((element: any, index: number) => {
      if (index == indexSelected) {
        return { ...element, active: 'active' };
      }
      return { ...element, active: 'inactive' };
    });
  };

  setActiveForCategory(indexSelected: number) {
    this.categories = this.categories.map((element: any, index: number) => {
      if (index == indexSelected) {
        return { ...element, active: 'active' };
      }
      return { ...element, active: 'inactive' };
    });
  }

  addToCart = (product: any) => {
    let order = {
      productId: product.id,
      orderId: null,
      quantity: 1,
      balance: product.price,
      clientIp: this.clientIp,
      userId: null,
    };
    this.homeService.createOrderDetail(order).then((res: any) => {
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
