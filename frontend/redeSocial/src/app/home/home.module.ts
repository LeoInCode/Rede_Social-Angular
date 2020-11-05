import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../core/core.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule
  ]
})
export class HomeModule { }
