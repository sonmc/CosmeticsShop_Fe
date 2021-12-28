import { StatisticalComponent } from './statistical.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
 

const routes: Routes = [
  {
    path: '',
    component: StatisticalComponent,
    data: {
      title: 'Statistical'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticalRoutingModule { }
