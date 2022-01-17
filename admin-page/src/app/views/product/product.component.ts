import { CommonService } from "./../../containers/services/common.service";
import { ProductService } from "./../../containers/services/product.service";
import { ToastrService } from "ngx-toastr";
import { BrandService } from "../../containers/services/brand.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { URL_IMAGE, SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CategoryService } from "../../containers/services/category.service";
import { CompositionService } from "../../containers/services/composition.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
})
export class ProductComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  categories: any = [];
  compositions: any = [];
  uploadStatus: string = "";
  products: any;
  brands: any = [];
  type: string;
  nameSearch: string = "";
  product: Object = {
    images: "",
    nameProduct: "",
    isDisabled: false,
    price: "",
    description: "",
    brandId: 0,
    compositionId: 0,
    brandName: "",
    totalItems: 0,
    code: this.autoGenerateCode(),
  };

  constructor(
    private brandService: BrandService,
    private productService: ProductService,
    private toastr: ToastrService,
    private categoryService: CategoryService,
    private commonService: CommonService,
    private compositionService: CompositionService
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getComposition();
  }

  autoGenerateCode() {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 6; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }

  getComposition() {
    this.compositionService.get().subscribe((res) => {
      if (SUCCESS_STATUS == res["status"]) {
        this.compositions = res["data"];
      }
    });
  }
  getCategory() {
    this.categoryService.get().subscribe((res) => {
      if (SUCCESS_STATUS == res["status"]) {
        this.categories = res["data"];
        this.getBrands(res["data"][0].id);
      }
    });
  }

  getBrands = (categoryId) => {
    this.brandService.getByCategoryId(categoryId).subscribe((res) => {
      if (SUCCESS_STATUS == res["status"]) {
        this.brands = res["data"];
        this.product["brandId"] = this.brands[0].brandId;
        this.getProducts(res["data"][0].brandId);
      }
    });
  };

  getProducts(brandId) {
    this.productService.getByBrand(brandId).subscribe((res) => {
      if (SUCCESS_STATUS == res["status"]) {
        this.products = res["data"];
      }
    });
  }

  addComposition = (composition) => {
    this.product["compositionId"] = parseInt(composition);
  };

  changeBrand = (brandId) => {
    let brandDetail = this.brands.find((x) => x.brandId == brandId);
    this.product["brandName"] = brandDetail.name;
    this.product["brandId"] = brandDetail.brandId;
  };

  getBrandName = (brandId) => {
    let brandName = "";
    this.brands.forEach((element) => {
      if (element.brandId == brandId) {
        brandName = element.name;
      }
    });
    return brandName;
  };

  save = () => {
    if (this.product["brandId"] == 0) {
      this.toastr.error("Danh sách nhãn hiệu trống!", "Error");
    } else {
      this.product["brandId"] = parseInt(this.product["brandId"]);

      this.productService
        .save(this.product, this.type)
        .then((res) => {
          if (res["status"] == SUCCESS_STATUS) {
            this.toastr.success("Success", "");
            if (this.type === "add") {
              var pro = {
                ...res["data"],
                brandName: this.getBrandName(res["data"].brandId),
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
  searchProductByName = () => {
    this.productService
      .searchByName(this.nameSearch)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          this.products = res["data"];
        }
      })
      .catch((e) => {
        window.alert("Connection Error !");
      });
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
            brandId: 0,
            brandName: "",
            price: 0,
            description: "",
            code: this.autoGenerateCode(),
            compositionId: 0,
          };
    this.uploadStatus = "";
    this.modalCreate.show();
    if (this.brands.length < 1) {
      this.toastr.warning("Please create a brand first.", "Warning!");
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
          this.product["images"] = URL_IMAGE + res.data;
        })
        .catch((e) => {
          window.alert("Connection Error !");
        });
    }
  };
}
