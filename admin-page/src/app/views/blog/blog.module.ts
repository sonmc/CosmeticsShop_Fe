import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from "./blog.component";

import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    BlogRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [BlogComponent],
})
export class BlogModule {}
