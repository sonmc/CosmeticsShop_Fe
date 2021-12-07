import { UserComponent } from "./user.component";
import { NgModule } from "@angular/core";
import { UserRoutingModule } from "./user-routing.module";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    UserRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [UserComponent],
})
export class UserModule {}
