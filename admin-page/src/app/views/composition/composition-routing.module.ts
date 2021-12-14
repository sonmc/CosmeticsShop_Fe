import { CompositionComponent } from './composition.component'; 
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
 

const routes: Routes = [
  {
    path: '',
    component: CompositionComponent,
    data: {
      title: 'Composition'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompositionRoutingModule { }
