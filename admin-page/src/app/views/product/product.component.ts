import { CategoryService } from "./../../containers/services/category.service";
import { ProductService } from "./../../containers/services/product.service";

import { ModalDirective } from "ngx-bootstrap/modal";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class ProductComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  products: any;
  categories: any = [];
  type: string;
  product: Object = {
    images: "",
    name: "",
    listedPrice: "",
    description: "",
    categoryId: "",
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.productService.get().subscribe(
      (res) => {
        this.toastr.success("Success", "");
        if (SUCCESS_STATUS == res["status"]) {
          this.products = res["data"].filter((x) => x.id != 9999);
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
    this.getCategories();
  }

  getCategories = () => {
    this.categoryService.get().subscribe(
      (res) => {
        this.toastr.success("Success", "");
        if (SUCCESS_STATUS == res["status"]) {
          this.categories = res["data"].filter((x) => x.id != 9999);
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  };
  save = () => {
    this.productService
      .save(this.product, this.type)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          if (this.type === "create") {
            this.products.push(res["data"]);
          } else {
            for (let index = 0; index < this.products.length; index++) {
              if (this.products[index].id == res["data"].id) {
                this.products[index] = res["data"];
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
    this.productService.remove(id).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.products.length; index++) {
          if (this.products[index].id == id) {
            this.products.splice(index, 1);
          }
        }
      }
    });
  };

  openModal = (product, type) => {
    this.type = type;
    this.product =
      type === "edit"
        ? { ...product }
        : {
            name: "",
            description: "",
          };
    this.modalCreate.show();
  };
}
