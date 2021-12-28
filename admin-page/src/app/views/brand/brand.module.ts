 
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { BrandRoutingModule } from "./brand-routing.module";
import { BrandComponent } from "./brand.component";

@NgModule({
  imports: [
    BrandRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [BrandComponent],
})
export class BrandModule {}
