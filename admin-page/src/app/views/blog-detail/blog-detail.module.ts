import { BlogDetailComponent } from "./blog-detail.component";
import { BlogDetailRoutingModule } from "./blog-detail-routing.module";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    BlogDetailRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [BlogDetailComponent],
})
export class BlogDetailModule {}
