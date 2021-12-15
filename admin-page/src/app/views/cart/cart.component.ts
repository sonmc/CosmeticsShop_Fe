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
  @ViewChild("modalDetail") modalDetail: ModalDirective;
  carts: any;
  type: string;
  cart: Object = {
    name: "",
    description: "",
  };

  orderDetails: any = [];

  constructor(
    public cartService: CartService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cartService.get().subscribe(
      (res) => {
        this.toastr.success("Success", "");
        if (SUCCESS_STATUS == res["status"]) {
          this.carts = res["data"].filter((x) => x.id != 9999);
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  remove = (id) => {
    this.cartService.remove(id).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.carts.length; index++) {
          if (this.carts[index].id == id) {
            this.carts.splice(index, 1);
          }
        }
      }
    });
  };

  openCartDetail = (cartId) => {
    this.cartService.getCartDetail(cartId).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.orderDetails = res["data"];
        this.modalDetail.show();
      }
    });
  };
}
