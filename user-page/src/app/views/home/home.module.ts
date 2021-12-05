import { HomeRoutingModule } from './home.routing.component';
import { NgModule } from '@angular/core'; 

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HomeComponent } from './home.component';


@NgModule({
  imports: [
    HomeRoutingModule,
    CommonModule,
    FormsModule, 
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
