import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LayoutComponent } from "./views/layout/layout.component";
import { LoginComponent } from "./views/login/login.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login Page",
    },
  },
  {
    path: "",
    component: LayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "blog",
        loadChildren: () =>
          import("./views/blog/blog.module").then((m) => m.BlogModule),
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./views/cart/cart.module").then((m) => m.CartModule),
      },
      {
        path: "category",
        loadChildren: () =>
          import("./views/category/category.module").then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: "product",
        loadChildren: () =>
          import("./views/product/product.module").then((m) => m.ProductModule),
      },
      {
        path: "customer",
        loadChildren: () =>
          import("./views/customer/customer.module").then(
            (m) => m.CustomerModule
          ),
      },
      {
        path: "composition",
        loadChildren: () =>
          import("./views/composition/composition.module").then(
            (m) => m.CompositionModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
