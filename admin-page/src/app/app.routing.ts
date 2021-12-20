import { AdminGuard } from "./containers/guards/admin.guard";
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
        canActivate: [AdminGuard],
      },
      {
        path: "blog-detail/:blogId",
        loadChildren: () =>
          import("./views/blog-detail/blog-detail.module").then(
            (m) => m.BlogDetailModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "cart",
        loadChildren: () =>
          import("./views/cart/cart.module").then((m) => m.CartModule),
        canActivate: [AdminGuard],
      },
      {
        path: "cart-detail/:cartId",
        loadChildren: () =>
          import("./views/cart-detail/cart-detail.module").then(
            (m) => m.CartDetailModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "category",
        loadChildren: () =>
          import("./views/category/category.module").then(
            (m) => m.CategoryModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "product",
        loadChildren: () =>
          import("./views/product/product.module").then((m) => m.ProductModule),
        canActivate: [AdminGuard],
      },
      {
        path: "customer",
        loadChildren: () =>
          import("./views/customer/customer.module").then(
            (m) => m.CustomerModule
          ),
        canActivate: [AdminGuard],
      },
      {
        path: "composition",
        loadChildren: () =>
          import("./views/composition/composition.module").then(
            (m) => m.CompositionModule
          ),
        canActivate: [AdminGuard],
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
