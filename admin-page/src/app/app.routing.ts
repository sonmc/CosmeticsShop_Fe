import { BlogModule } from "./views/blog/blog.module";
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
        path: "user",
        loadChildren: () =>
          import("./views/user/user.module").then((m) => m.UserModule),
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
