import { Component, OnInit } from '@angular/core';
import { SUCCESS_STATUS } from 'src/app/containers/constants/config';
import { HomeService } from 'src/app/containers/services/home.service';
import { LocalStorageService } from 'src/app/containers/services/localStorage/local-storage.service';
declare var $: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
})
export class OrderDetailComponent implements OnInit {
  messageConfirm: string = '';
  orders: any = [];
  orderDetails: any = [];
  statuses: any = [
    {
      key: 0,
      value: 'Giao không thành công',
    },
    {
      key: 1,
      value: 'Đặt hàng',
    },
    {
      key: 3,
      value: 'Đang chuẩn bị hàng',
    },
    {
      key: 4,
      value: 'Đang giao hàng',
    },
    {
      key: 5,
      value: 'Giao thành công',
    },
  ];

  constructor(
    private homeService: HomeService,
    private storageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    let currentUser = this.storageService.get('customer');
    if (currentUser && currentUser.id) {
      this.homeService.getOrderByUserId(currentUser.id).subscribe(
        (res: any) => {
          if (SUCCESS_STATUS == res['status']) {
            this.orders = res['data'];
            this.orders = this.orders.map((item: any) => {
              item.statusName = this.getStatus(item.status);
              return item;
            });
          }
        },
        (err: any) => {
          window.alert('Connection Error !');
        }
      );
    }
  }

  getStatus = (statusKey: any) => {
    return this.statuses.find((x: any) => x.key == statusKey).value;
  };

  openOrderDetail = (order: any) => {
    this.homeService.getOrderDetailByOrderId(order.id).subscribe(
      (res: any) => {
        if (SUCCESS_STATUS == res['status']) {
          this.orderDetails = res['data'];
          $('#modalOrderDetail').modal('show');
        }
      },
      (err: any) => {
        window.alert('Connection Error !');
      }
    );
  };
}
