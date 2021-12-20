import { ToastrService } from "ngx-toastr";
import { ModalDirective } from "ngx-bootstrap/modal";
import { CartDetailService } from "./../../containers/services/cart-detail.service";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-cart-detail",
  templateUrl: "./cart-detail.component.html",
})
export class CartDetailComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;

  orderDetails: any = [];
  type: string = "";
  orderDetail: any = {
    productName: "",
    quantity: "",
    price: "",
  };

  cartId: number = 0;
  constructor(
    private cartDetailService: CartDetailService,
    private actRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.cartId = parseInt(this.actRoute.snapshot.params.cartId);
  }

  ngOnInit(): void {
    this.cartDetailService.getCartDetail(this.cartId).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.orderDetails = res["data"];
      }
    });
  }

  openModal = (orderDetail, type) => {
    this.type = type;
    this.orderDetail =
      type === "edit"
        ? {
            ...orderDetail,
            productName: orderDetail.product.nameProduct,
            price: orderDetail.product.listedPrice,
          }
        : {
            productName: "",
            quantity: "",
            price: "",
          };
    this.modalCreate.show();
  };

  save = () => {
    this.cartDetailService
      .save(this.orderDetail, this.type)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          if (this.type === "create") {
            this.orderDetails.push(res["data"]);
          } else {
            for (let index = 0; index < this.orderDetails.length; index++) {
              if (this.orderDetails[index].id == res["data"].id) {
                this.orderDetails[index] = res["data"];
              }
            }
          }
        }
      })
      .catch((e) => {
        window.alert("Connection Error !");
      });
    this.modalCreate.hide();
  };

  remove = (id) => {
    this.cartDetailService.remove(id).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.orderDetails.length; index++) {
          if (this.orderDetails[index].id == id) {
            this.orderDetails.splice(index, 1);
          }
        }
      }
    });
  };

}
