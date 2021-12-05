import { BlogSingleComponent } from './blog-single.component'; 
 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  
 

const routes: Routes = [
  {
    path: '',
    component: BlogSingleComponent,
    data: {
      title: 'Blog Page'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogSingleRoutingModule { }
