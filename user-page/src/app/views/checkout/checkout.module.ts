import { CheckoutRoutingModule } from './checkout.routing.component';
 

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckoutComponent } from './checkout.component';

@NgModule({
  imports: [CheckoutRoutingModule, CommonModule, FormsModule],
  declarations: [CheckoutComponent],
})
export class CheckoutModule {}
