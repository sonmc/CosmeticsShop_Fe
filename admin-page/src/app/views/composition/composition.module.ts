import { CompositionComponent } from './composition.component';
import { CompositionRoutingModule } from './composition-routing.module';
 
import { NgModule } from "@angular/core";

import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  imports: [
    CompositionRoutingModule,
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [CompositionComponent],
})
export class CompositionModule {}
