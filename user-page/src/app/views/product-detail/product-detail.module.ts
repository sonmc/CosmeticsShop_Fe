import { ProductDetailRoutingModule } from './home.routing.component';
import { ProductDetailComponent } from './product-detail.component';
 

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ProductDetailRoutingModule, CommonModule, FormsModule],
  declarations: [ProductDetailComponent],
})
export class ProductDetailModule {}
