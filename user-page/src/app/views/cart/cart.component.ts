import { Component, OnInit } from '@angular/core';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { CommonService } from 'src/app/containers/services/common.service';
import { HomeService } from 'src/app/containers/services/home.service';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  messageConfirm: string = '';
  orderDetails: any = [];
  totalBalance: any = 0;
  customerInfo: any = {
    userName: '',
    phoneNumber: '',
    address: '',
    clientIp: 0,
  };
  infoIsEmpty: string = '';
  isShowPayment: boolean = false;
  constructor(
    private commonService: CommonService,
    private storageService: LocalStorageService,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    var customer = this.storageService.get('customer');
    this.commonService.getClientIp().then((res: any) => {
      const ip = res['ip'];
      this.customerInfo.clientIp = ip;
      let user = {
        userId: customer?.id || 0,
        clientIp: ip,
      };
      this.homeService.getOrderDetail(user).subscribe((res: any) => {
        if (res.data && res.status === SUCCESS_STATUS) {
          this.orderDetails = res.data;
          this.calculatorTotalBalance(this.orderDetails);
        }
      });
    });
  }

  calculatorTotalBalance(orderDetails: any) {
    let balance = 0;
    orderDetails.forEach((order: any) => {
      balance += order.balance;
      this.totalBalance = parseFloat(balance.toFixed(3));
    });
  }

  decrease = (product: any) => {
    this.orderDetails = this.orderDetails.map((item: any) => {
      if (product.totalItems >= item.quantity && item.quantity > 1) {
        if (item.id == product.id) {
          item.quantity--;
          item.balance = parseFloat(
            (item.product.price * item.quantity).toFixed(3)
          ); 
        } 
      }
      return item;
    });
    this.calculatorTotalBalance(this.orderDetails);
  };

  whenBlur = (product: any, target: any) => {
    if (target.value && parseInt(target.value) > 0) {
      this.orderDetails = this.orderDetails.map((item: any) => {
        if (product.totalItems > item.quantity) {
          if (item.id == product.id) {
            item.balance = parseFloat(
              (item.product.price * item.quantity).toFixed(3)
            );
          }
        }
        return item;
      });
      this.calculatorTotalBalance(this.orderDetails);
    } else {
      this.orderDetails = this.orderDetails.map((item: any) => {
        if (product.totalItems > item.quantity) {
          item.quantity = 1;
        }
        return item;
      });
    }
  };

  increase = (product: any) => {
    this.orderDetails = this.orderDetails.map((item: any) => {
      if (product.totalItems > item.quantity) {
        if (item.id == product.id) {
          item.quantity++;
          item.balance = parseFloat(
            (item.product.price * item.quantity).toFixed(3)
          );
        }
      }
      return item;
    });
    this.calculatorTotalBalance(this.orderDetails);
  };

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

  autoGenerateCode() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  createOrder(customer: any) {
    let order = {
      orderCode: this.autoGenerateCode(),
      customerId: customer.id,
      customerName: customer.userName,
      customerAddress: customer.address,
      customerPhoneNumber: customer.phoneNumber + '',
      status: '1',
      orderDetails: this.orderDetails,
      totalBalance: this.totalBalance,
    };
    this.homeService.createOrder(order).then((res: any) => {
      if (res.data && res.status === SUCCESS_STATUS) {
        this.orderDetails = [];
        $('#modalConfirm').modal('show');
        this.messageConfirm = 'Đặt hàng thành công!';
      }
    });
  }
  deleteOrderDetail = (id: any) => {
    this.homeService.deleteOrderDetail(id).subscribe((res: any) => {
      if (res.data && res.status === SUCCESS_STATUS) {
        this.orderDetails = this.orderDetails.filter(
          (x: any) => x.id != res.data.id
        );
      }
    });
  };
  order = () => {
    this.isShowPayment = !this.isShowPayment;
  };

  payment = () => {
    if (
      this.customerInfo.userName &&
      this.customerInfo.phoneNumber &&
      this.customerInfo.address
    ) {
      this.createCustomer();
    } else {
      this.infoIsEmpty = 'Xin mời quý khách nhập đầy đủ thông tin liên hệ !';
    }
  };
  changeInfo = () => {
    if (
      this.customerInfo.userName &&
      this.customerInfo.phoneNumber &&
      this.customerInfo.address
    ) {
      this.infoIsEmpty = '';
    } else { 
    }
  };
}
