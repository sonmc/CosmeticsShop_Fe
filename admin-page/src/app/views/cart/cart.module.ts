import { CartComponent } from "./cart.component";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { CartRoutingModule } from "./cart-routing.module";

@NgModule({
  imports: [
    CartRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [CartComponent],
})
export class CartModule {}
