import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    data: {
      title: 'Home',
    },
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./views/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'blog',
        loadChildren: () =>
          import('./views/blog/blog.module').then((m) => m.BlogModule),
      }, 
      {
        path: "product-detail/:idDetail", 
        loadChildren: () =>
          import('./views/product-detail/product-detail.module').then(
            (m) => m.ProductDetailModule
          ),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./views/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./views/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./views/login/login.module').then((m) => m.LoginModule),
      },
      {
        path: 'blog-single',
        loadChildren: () =>
          import('./views/blog-single/blog-single.module').then(
            (m) => m.BlogSingleModule
          ),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./views/contact/contact.module').then((m) => m.ContactModule),
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
