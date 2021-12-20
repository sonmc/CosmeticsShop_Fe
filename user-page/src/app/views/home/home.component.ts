import { SUCCESS_STATUS } from './../../containers/constants/config';
import { ProductService } from './../../containers/services/product.service';
import { CategoryService } from './../../containers/services/category.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  categories: any = [];
  products: any = [];
  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.getCategory();
    this.getProduct();
  }

  getProduct = () => {
    this.productService.get().subscribe(
      (res: any) => {
        if (SUCCESS_STATUS == res['status']) {
          this.products = res['data'].filter((x: any) => x.id != 9999);
          console.log(this.products);
          
        }
      },
      (err) => {
        window.alert('Connection Error !');
      }
    );
  };

  getCategory = () => {
    this.categoryService.get().subscribe(
      (res: any) => {
        if (SUCCESS_STATUS == res['status']) {
          this.categories = res['data'].filter((x: any) => x.id != 9999);
          console.log(this.categories);
          
        }
      },
      (err: any) => {
        window.alert('Connection Error !');
      }
    );
  };
}
