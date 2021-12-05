import { ProductRoutingModule } from './home.routing.component';
import { ProductsComponent } from './products.component';

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ProductRoutingModule, CommonModule, FormsModule],
  declarations: [ProductsComponent],
})
export class ProductModule {}
