import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroComponent } from './cadastro/cadastro.component';
import { FirstPageComponent } from './first-page.component';
import { LoginComponent } from './login/login.component';
import { FirstPageRoutingModule } from './first-page-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    FirstPageComponent,
    CadastroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FirstPageRoutingModule
  ]
})
export class FirstPageModule { }
