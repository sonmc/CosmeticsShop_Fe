import { CartComponent } from './cart.component';
import { CartRoutingModule } from './cart.routing.component';

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CartRoutingModule, CommonModule, FormsModule],
  declarations: [CartComponent],
})
export class CartModule {}
