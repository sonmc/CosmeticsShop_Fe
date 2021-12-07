import { Component, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../../containers/services/user/user.service";
import { SUCCESS_STATUS } from "../../containers/constants/config";
import { ModalDirective } from "ngx-bootstrap/modal";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user",
  templateUrl: "user.component.html",
})
export class UserComponent implements OnInit {
  @ViewChild("modalCreate") modalCreate: ModalDirective;
  users: any;
  user: Object = {
    userName: "",
    email: "", 
    phoneNumber: "",
    address: "",
    gender: 1,
    isActive: true,
  };

  constructor(
    public userService: UserService,
    public router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService.get().subscribe(
      (res) => {
        this.toastr.success("Success", "");
        if (SUCCESS_STATUS == res["status"]) {
          this.users = res["data"];
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  }

  save = () => {
    this.userService.get().subscribe(
      (res) => {
        this.toastr.success("Success", "");
        if (res["status"] == SUCCESS_STATUS) {
          this.users.push(res["data"]);
          this.modalCreate.hide();
        }
      },
      (err) => {
        window.alert("Connection Error !");
      }
    );
  };
  
  openModalCreate = () => {
    this.user = {
      userName: "",
      email: "", 
      phoneNumber: "",
      address: "",
      gender: 1,
      isActive: true,
    };
    this.modalCreate.show();
  };

  deactive = (id) => {
    this.userService
      .deactive(id)
      .then((res) => {
        if (res["status"] == SUCCESS_STATUS) {
          this.toastr.success("Success", "");
          for (let index = 0; index < this.users.length; index++) {
            if (this.users[index].employeeId == id) {
              this.users.splice(index, 1);
            }
          }
        }
      })
      .catch((e) => {
        window.alert("Connection Error !");
      });
  };

  onItemChange = (value) => {
    this.user["gender"] = value;
  };
}
