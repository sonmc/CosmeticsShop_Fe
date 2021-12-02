import { NgModule } from '@angular/core';
import { EmployeeRoutingModule } from './employee-routing.module';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  imports: [
    EmployeeRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [EmployeeComponent]
})
export class EmployeeModule { }
