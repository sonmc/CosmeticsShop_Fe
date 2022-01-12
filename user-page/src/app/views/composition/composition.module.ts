 

import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompositionComponent } from './composition.component';
import { CompositionRoutingModule } from './composition.routing.component';

@NgModule({
  imports: [CompositionRoutingModule, CommonModule, FormsModule],
  declarations: [CompositionComponent],
})
export class CompositionModule {}
