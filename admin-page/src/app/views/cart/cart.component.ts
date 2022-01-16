import { CartService } from "../../containers/services/cart.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { SUCCESS_STATUS } from "../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
})
export class CartComponent implements OnInit {
  @ViewChild("modalUpdate") modalUpdate: ModalDirective;
  orderCodeSearch: string = "";
  carts: any;
  cart: Object = {
    customerAddress: "",
    customerName: "",
    customerPhoneNumber: "",
    orderCode: "",
    status: "",
  };
  statuses = [
    {
      key: 0,
      value: "Giao không thành công",
    },
    {
      key: 1,
      value: "Đặt hàng",
    }, 
    {
      key: 3,
      value: "Đang chuẩn bị hàng",
    },
    {
      key: 4,
      value: "Đang giao hàng",
    },
    {
      key: 5,
      value: "Giao thành công",
    },
  ];

  constructor(
    public cartService: CartService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartService.get().subscribe(
      (res) => {
        if (SUCCESS_STATUS == res["status"]) {
          this.carts = res["data"];
          this.carts = this.carts.map((item) => {
            item.statusName = this.getStatus(item.status);
            return item;
          });
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  searchOrderByCode = () => {
    this.cartService.searchOrderByCode(this.orderCodeSearch).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.carts = res["data"];
      }
    });
  };

  getStatus = (statusKey) => {
    return this.statuses.find((x) => x.key == statusKey).value;
  };
 

  cancelOrder = (cartId) => {
    this.cartService.cancelOrder(cartId).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.carts.length; index++) {
          if (this.carts[index].id == cartId) {
            this.carts.splice(index, 1);
          }
        }
      }
    });
  };

  updateCart = () => {
    this.cartService.edit(this.cart).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.carts.length; index++) {
          if (this.carts[index].id == this.cart["id"]) {
            this.cart["statusName"] = this.getStatus(this.cart["status"]);
            this.carts[index] = this.cart;
          }
        }
        this.modalUpdate.hide();
      }
    });
  };

  openCartDetail = (cartId) => {
    this.router.navigate(["/cart-detail", cartId]);
  };

  openModalUpdate = (cart) => {
    this.cart = { ...cart };
    this.modalUpdate.show();
  };
}
