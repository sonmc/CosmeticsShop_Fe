import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
})
export class HeaderComponent {
  constructor(public router: Router) {}
  changePage(page: string) { 
    this.router.navigate([page]);
  }
}
