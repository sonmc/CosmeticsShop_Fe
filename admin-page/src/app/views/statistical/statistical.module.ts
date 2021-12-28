 
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";
import { StatisticalComponent } from "./statistical.component";
import { StatisticalRoutingModule } from "./statistical-routing.module";

@NgModule({
  imports: [
    StatisticalRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [StatisticalComponent],
})
export class StatisticalModule {}
