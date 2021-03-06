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
  carts: any = [];
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
      if (customer) {
        this.customerInfo = { ...customer, clientIp: ip };
      } else {
        this.customerInfo.clientIp = ip;
      }

      let user = {
        userId: customer?.id || 0,
        clientIp: ip,
      };
      this.homeService.getCart(user).subscribe((res: any) => {
        if (res.data && res.status === SUCCESS_STATUS) {
          this.carts = res.data;
          this.calculatorTotalBalance(this.carts);
        }
      });
    });
  }

  calculatorTotalBalance(carts: any) {
    let balance = 0;
    carts.forEach((order: any) => {
      balance += order.balance;
      this.totalBalance = parseFloat(balance.toFixed(3));
    });
  }

  decrease = (product: any) => {
    this.carts = this.carts.map((item: any) => {
      if (product.totalItems >= item.quantity && item.quantity > 1) {
        if (item.productId == product.id) {
          item.quantity--;
          item.balance = parseFloat(
            (item.product.price * item.quantity).toFixed(3)
          );
        }
      }
      return item;
    });
    this.calculatorTotalBalance(this.carts);
  };

  whenBlur = (product: any, target: any) => {
    if (target.value && parseInt(target.value) > 0) {
      this.carts = this.carts.map((item: any) => {
        if (product.totalItems > item.quantity) {
          if (item.productId == product.id) {
            item.balance = parseFloat(
              (item.product.price * item.quantity).toFixed(3)
            );
          }
        }
        return item;
      });
      this.calculatorTotalBalance(this.carts);
    } else {
      this.carts = this.carts.map((item: any) => {
        if (product.totalItems > item.quantity) {
          item.quantity = 1;
        }
        return item;
      });
    }
  };

  increase = (product: any) => { 
    this.carts = this.carts.map((item: any) => {
      if (product.totalItems > item.quantity) {
        if (item.productId == product.id) {
          item.quantity++;
          item.balance = parseFloat(
            (item.product.price * item.quantity).toFixed(3)
          );
        }
      }
      return item;
    });
    this.calculatorTotalBalance(this.carts);
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

  updateUser(user: any) {
    this.homeService
      .updateUser({
        id: user.id,
        address: user.address,
        phoneNumber: user.phoneNumber,
        username: user.username,
      })
      .then((res: any) => {
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
    let orderDetails = this.carts.map((cart: any) => {
      return {
        orderId: 0,
        quantity: cart.quantity,
        balance: cart.balance,
        userId: customer.id,
        clientIp: cart.clientIp,
        dateTrade: '',
        status: '1',
        productId: cart.productId,
      };
    });
    let order = {
      orderCode: this.autoGenerateCode(),
      userId: customer.id,
      customerName: customer.userName,
      customerAddress: customer.address,
      customerPhoneNumber: customer.phoneNumber + '',
      status: '1',
      orderDetails: orderDetails,
      totalBalance: this.totalBalance,
    };
    this.homeService.createOrder(order).then((res: any) => {
      if (res.data && res.status === SUCCESS_STATUS) {
        this.carts = [];
        $('#modalConfirm').modal('show');
        this.messageConfirm = '?????t h??ng th??nh c??ng!';
      }
    });
  }
  deleteOrderDetail = (id: any) => {
    this.homeService.deleteOrderDetail(id).subscribe((res: any) => {
      if (res.data && res.status === SUCCESS_STATUS) {
        this.carts = this.carts.filter((x: any) => x.id != res.data.id);
        this.calculatorTotalBalance(this.carts);
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
      var customer = this.storageService.get('customer');
      if (customer) {
        let user = {
          id: customer.id,
          phoneNumber: this.customerInfo.phoneNumber + '',
          address: this.customerInfo.address,
          username: customer.username,
        };
        this.updateUser(user);
      } else {
        this.createCustomer();
      }
    } else {
      this.infoIsEmpty = 'Xin m???i qu?? kh??ch nh???p ?????y ????? th??ng tin li??n h??? !';
    }
  };
  changeInfo = (field: string, event: any) => {
    if (field == 'phoneNumber') { 
      const isNumber = isNaN(event.key);
      if (isNumber) {
        event.preventDefault(); 
      }
    } else {
      if (
        this.customerInfo.userName &&
        this.customerInfo.phoneNumber &&
        this.customerInfo.address
      ) {
        this.infoIsEmpty = '';
      }
    }
  };
}
