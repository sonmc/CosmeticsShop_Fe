import { BlogSingleComponent } from './blog-single.component';
import { BlogSingleRoutingModule } from './blog-single.routing';
  
import { NgModule } from '@angular/core'; 

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  


@NgModule({
  imports: [
    BlogSingleRoutingModule,
    CommonModule,
    FormsModule, 
  ],
  declarations: [BlogSingleComponent]
})
export class BlogSingleModule { }
