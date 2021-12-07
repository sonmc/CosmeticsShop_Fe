import { ProductComponent } from "./product.component";
import { NgModule } from "@angular/core";
import { ProductRoutingModule } from "./product-routing.module";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    ProductRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [ProductComponent],
})
export class ProductModule {}
