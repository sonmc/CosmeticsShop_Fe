import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../../containers/services/user/user.service';
import { SUCCESS_STATUS } from '../../containers/constants/config';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: 'employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @ViewChild('modalCreate') modalCreate: ModalDirective;
  employees: any;
  employee: Object = {
    userName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    address: "",
    gender: 1,
    isActive: true
  };
  teamId: Number;
  branchId: Number;
  constructor(public userService: UserService,
    private actRoute: ActivatedRoute,
    public router: Router,
    private toastr: ToastrService
  ) {
    this.teamId = this.actRoute.snapshot.params.teamId ? parseInt(this.actRoute.snapshot.params.teamId) : 0;
    this.branchId = 1;
  }

  ngOnInit(): void {
   /* this.userService.get(this.teamId, this.branchId)
      .then(res => {
        if (SUCCESS_STATUS == res['status']) {
          this.employees = res['data'];
        }
      }).catch(e => {
        window.alert('Connection Error !');
      }) */
      this.employees = [
        {
          id:1,
          userName: "Kiều Anh",
          email: "kieuanh@gmail.com",
          dob: "29/12/2020",
          phoneNumber: "0983883686",
          address: "Hà nội"
        }
      ]
  }

  save = () => {
    this.userService.get(1,1)
    .subscribe(res => {
         this.toastr.success('Success', '');
         if (res['status'] == SUCCESS_STATUS) {
           this.employees.push(res['data']);
           this.modalCreate.hide();
         }
        }, err => {
          window.alert('Connection Error !');
        })
  }
  openModalCreate = () => {
    this.employee = {
      userName: "",
      email: "",
      dob: "",
      phoneNumber: "",
      address: "",
      gender: 1,
      isActive: true,
      branchId: this.branchId
    };
    this.modalCreate.show();
  }
  deactive = (id) => {
    this.userService.deactive(id)
      .then(res => {
        if (res['status'] == SUCCESS_STATUS) {
          this.toastr.success('Success', '');
          for (let index = 0; index < this.employees.length; index++) {
            if (this.employees[index].employeeId == id) {
              this.employees.splice(index, 1);
            }
          }
        }
      }).catch(e => {
        window.alert('Connection Error !');
      })
  }
  onItemChange = (value) => {
    this.employee["gender"] = value;
  }
}
