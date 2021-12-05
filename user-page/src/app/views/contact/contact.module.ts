import { ContactRoutingModule } from './contact.routing.component';
import { ContactComponent } from './contact.component'; 
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [ContactRoutingModule, CommonModule, FormsModule],
  declarations: [ContactComponent],
})
export class ContactModule {}
