import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.routing'; 
import { NgModule } from '@angular/core'; 

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  


@NgModule({
  imports: [
    BlogRoutingModule,
    CommonModule,
    FormsModule, 
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
