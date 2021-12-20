import { CommonService } from "./../../containers/services/common.service";
import { element } from "protractor";
import { CategoryService } from "./../../containers/services/category.service";
import { ProductService } from "./../../containers/services/product.service";

import { ModalDirective } from "ngx-bootstrap/modal";
import { API_URL, SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class ProductComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  uploadStatus: string = "";
  products: any;
  categories: any = [
    {
      id: 0,
      name: "Select a category",
    },
  ];
  type: string;
  product: Object = {
    images: "",
    nameProduct: "",
    isDisabled: false,
    listedPrice: "",
    description: "",
    categoryId: 0,
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    private toastr: ToastrService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.productService.get().subscribe(
      (res) => {
        if (SUCCESS_STATUS == res["status"]) {
          this.toastr.success("Success", "");
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
          if (res["data"].length > 0) {
            res["data"].forEach((element) => {
              if (element.id != "9999") {
                this.categories.push(element);
              }
            });
          }
          this.product["categoryId"] = this.categories[0];
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  };
  getCategoryName = (caId) => {
    let categoryName = "";
    this.categories.forEach((element) => {
      if (element.id == caId) {
        categoryName = element.name;
      }
    });
    return categoryName;
  };
  save = () => {
    if (this.product["categoryId"] == 0) {
      this.toastr.error("Please select a category!", "Error");
    } else {
      this.product["categoryId"] = parseInt(this.product["categoryId"]);
      this.productService
        .save(this.product, this.type)
        .then((res) => {
          if (res["status"] == SUCCESS_STATUS) {
            this.toastr.success("Success", "");
            if (this.type === "add") {
              var pro = {
                ...res["data"],
                nameCategory: this.getCategoryName(res["data"].categoryId),
              };
              this.products.push(pro);
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
    }
  };

  remove = (product) => {
    product.isDisabled = true;
    this.productService.remove(product).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.products.length; index++) {
          if (this.products[index].id == product.id) {
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
            categoryId: 0,
            nameCategory: "",
            listedPrice: 0,
            description: "",
          };
    this.uploadStatus = "";
    this.modalCreate.show();
    if (this.categories.length < 2) {
      this.toastr.warning("Please create a category first.", "Warning!");
      this.modalCreate.show();
    }
  };

  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    let file = element.files![0];
    if (file) {
      this.commonService
        .upload(file)
        .then((res: any) => {
          this.uploadStatus = res.message;
          this.product["images"] = "https://localhost:4000/" + res.data;
        })
        .catch((e) => {
          window.alert("Connection Error !");
        });
    }
  };
}
