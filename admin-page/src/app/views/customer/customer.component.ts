import { ModalDirective } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { SUCCESS_STATUS } from "./../../containers/constants/config";
import { Component, OnInit, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { UserService } from "../../containers/services/user.service";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
})
export class CustomerComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  customers: any = [];
  messageError: string = "";
  type: string;
  customer: Object = {
    name: "",
    phoneNumber: "",
    email: "",
    role: 2,
  };

  constructor(
    public userService: UserService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.getCustomer().subscribe(
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
    if (
      this.customer["name"] &&
      this.customer["phoneNumber"] &&
      this.customer["email"]
    ) {
      this.userService
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
    } else {
      this.messageError = "Vui lòng nhập đầy đủ thông tin";
    }
  };

  remove = (customer) => {
    this.userService.deactive(customer.id).then((res) => {
      if (res["status"] == SUCCESS_STATUS) {
        this.toastr.success("Success", "");
        for (let index = 0; index < this.customers.length; index++) {
          if (this.customers[index].id == customer.id) {
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
