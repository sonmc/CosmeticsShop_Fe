import { CartComponent } from './cart.component'; 
 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';   
 

const routes: Routes = [
  {
    path: '',
    component: CartComponent,
    data: {
      title: 'Cart'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
