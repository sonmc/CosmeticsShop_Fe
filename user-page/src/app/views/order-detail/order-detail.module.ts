import { OrderDetailRoutingModule } from './order-detail.routing.component';

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderDetailComponent } from './order-detail.component';

@NgModule({
  imports: [OrderDetailRoutingModule, CommonModule, FormsModule],
  declarations: [OrderDetailComponent],
})
export class OrderDetailModule {}
