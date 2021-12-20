import { CartDetailComponent } from './cart-detail.component';
import { CartDetailRoutingModule } from "./cart-detail-routing.module";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CartDetailRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [CartDetailComponent],
})
export class CartDetailModule {}
