import { CartDetailComponent } from './cart-detail.component';
 
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: CartDetailComponent,
    data: {
      title: "Cart Detail",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartDetailRoutingModule {}
