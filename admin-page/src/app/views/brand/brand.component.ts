import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToastrService } from "ngx-toastr";
import { SUCCESS_STATUS } from "../../containers/constants/config";
import { BrandService } from "../../containers/services/brand.service";
import { CategoryService } from "../../containers/services/category.service";

@Component({
  selector: "app-brand",
  templateUrl: "./brand.component.html",
})
export class BrandComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;

  brands: any = [];
  type: string;
  categories: any = [];
  categoryIdSelected: any = 0;
  brand: Object = {
    name: "",
    brandId: 0,
    categoryId: 0,
    description: "",
  };

  constructor(
    public brandService: BrandService,
    public categoryService: CategoryService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getCategory();
  }

  getCategory() {
    this.categoryService.get().subscribe(
      (res) => {
        if (SUCCESS_STATUS == res["status"]) {
          if (res["data"].length == 0) {
            this.toastr.error("Danh sách danh mục trống!", "Error");
          }
          res["data"].forEach((element) => {
            this.categories.push(element);
            this.getBrandByCategory(res["data"][0].id || 0);
          });
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  getBrandByCategory(categoryId: number) {
    this.categoryIdSelected = categoryId;
    this.brandService.getByCategoryId(categoryId).subscribe(
      (res) => {
        if (SUCCESS_STATUS == res["status"]) {
          this.brands = res["data"];
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  save = () => { 
    if (!this.brand["categoryId"] || this.brand["categoryId"] == 0) {
      this.toastr.error("Danh sách danh mục trống!", "Error");
    } else {
      this.brandService
        .save(this.brand, this.type)
        .then((res) => {
          if (res["status"] == SUCCESS_STATUS) {
            this.toastr.success("Success", "");
            if (this.type === "create") {
              if (res["data"].categoryId == this.categoryIdSelected) {
                this.brands.push(res["data"]);
              }
            } else {
              for (let index = 0; index < this.brands.length; index++) {
                if (this.brands[index].brandId == res["data"].brandId) {
                  this.brands[index] = res["data"];
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

  remove = (id) => {
    this.brandService.remove(id).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.brands.length; index++) {
          if (this.brands[index].brandId == id) {
            this.brands.splice(index, 1);
          }
        }
      }
    });
  };

  openModal = (brand, type) => {
    this.type = type;
    this.brand =
      type === "edit"
        ? { ...brand }
        : {
            name: "",
            description: "",
            categoryId: 0,
          };
    this.modalCreate.show();
  };
}
