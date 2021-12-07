import { CategoryRoutingModule } from "./category-routing.module";
import { CategoryComponent } from "./category.component";
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CategoryRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [CategoryComponent],
})
export class CategoryModule {}
