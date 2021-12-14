import { CustomerComponent } from "./customer.component";
import { NgModule } from "@angular/core";
import { CustomerRoutingModule } from "./customer-routing.module";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CustomerRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [CustomerComponent],
})
export class CustomerModule {}
