import { Component, OnInit } from '@angular/core';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { CartService } from 'src/app/containers/services/cart.service';
import { CommonService } from 'src/app/containers/services/common.service';
import { CustomerService } from 'src/app/containers/services/customer.service';
import { HomeService } from 'src/app/containers/services/home.service';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  carts: any = [];
  clientIp: string = '';
  customerInfo: any = {
    name: '',
    phoneNumber: '',
    address: '',
  };
  constructor(
    private commonService: CommonService,
    private storageService: LocalStorageService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.commonService.getClientIp().then((res: any) => {
      const ip = res['ip'];
      this.clientIp = ip;
      this.carts = this.getCartByIp(ip);
    });
  }

  getCartByIp(ip: string) {
    let carts = this.storageService.get(ip);
    return carts;
  }

  createCustomer() {
    this.customerInfo = {
      ...this.customerInfo,
      phoneNumber: this.customerInfo.phoneNumber + '',
    };
    this.homeService.createCustomer(this.customerInfo).then((res: any) => {
      if (res.data && res.status === SUCCESS_STATUS) {
        this.createOrder(res.data);
      }
    });
  }

  createOrder(customer: any) {
    let order = {
      orderCode: '',
      customerId: customer.id,
      customerName: customer.name,
      customerAddress: customer.address,
      customerPhoneNumber: customer.phoneNumber + '',
      status: 'Order',
      orderDetails: this.carts,
    };
    this.homeService.createOrder(order).then((res: any) => {
      if (res.data && res.status === SUCCESS_STATUS) {
        this.storageService.delete(this.clientIp);
        this.carts = [];
      }
    });
  }

  payment = () => {
    this.createCustomer();
  };
}
