import { SUCCESS_STATUS } from './../../containers/constants/config';

import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/containers/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  categories: any = [];
  products: any = [];
  brands: any = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.getCategory();
    this.getProduct(1, 0);
    this.getBrand(1, 0);
  }

  getBrand = (categoryId: any, indexSelected: number) => {
    this.homeService.getBrand(categoryId).subscribe((res: any) => {
      if (SUCCESS_STATUS == res['status']) {
        this.brands = res['data'].map((element: any, index: number) => {
          if (index == 0) {
            return { ...element, active: 'active' };
          }
          return { ...element, active: 'inactive' };
        });
        this.setActiveForCategory(indexSelected);
      }
    });
  };

  getProduct = (brandId: any, indexSelected: number) => {
    this.homeService.getProduct(brandId).subscribe((res: any) => {
      if (SUCCESS_STATUS == res['status']) {
        this.setActiveForBrand(indexSelected);
        this.products = res['data'];
      }
    });
  };

  getCategory = () => {
    this.homeService.getCategory().subscribe((res: any) => {
      if (SUCCESS_STATUS == res['status']) {
        this.categories = res['data'].map((element: any, index: number) => {
          if (index == 0) {
            return { ...element, active: 'active' };
          }
          return { ...element, active: 'inactive' };
        });
      }
    });
  };

  setActiveForBrand = (indexSelected: number) => {
    this.brands = this.brands.map((element: any, index: number) => {
      if (index == indexSelected) {
        return { ...element, active: 'active' };
      }
      return { ...element, active: 'inactive' };
    });
  };

  setActiveForCategory(indexSelected: number) {
    this.categories = this.categories.map((element: any, index: number) => {
      if (index == indexSelected) {
        return { ...element, active: 'active' };
      }
      return { ...element, active: 'inactive' };
    });
  }
}
