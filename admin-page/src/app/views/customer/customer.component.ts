import { CustomerService } from "./../../containers/services/customer.service";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
})
export class CustomerComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  customers: any;
  type: string;
  customer: Object = {
    name: "",
    phoneNumber: "",
    email: "",
    role: 2,
  };

  constructor(
    public customerService: CustomerService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.customerService.get().subscribe(
      (res) => {
        if (SUCCESS_STATUS == res["status"]) {
          this.customers = res["data"];
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  save = () => {
    this.customerService
      .save(this.customer, this.type)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          if (this.type === "create") {
            this.customers.push(res["data"]);
          } else {
            for (let index = 0; index < this.customers.length; index++) {
              if (this.customers[index].id == res["data"].id) {
                this.customers[index] = res["data"];
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
    this.customerService.remove(id).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.customers.length; index++) {
          if (this.customers[index].id == id) {
            this.customers.splice(index, 1);
          }
        }
      }
    });
  };

  openModal = (customer, type) => {
    this.type = type;
    this.customer =
      type === "edit"
        ? { ...customer }
        : {
            name: "",
            description: "",
          };
    this.modalCreate.show();
  };
}
