import { CadastroComponent } from './first-page/cadastro/cadastro.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './first-page/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: FirstPageComponent
  },
  {
    path: 'first-page', component: FirstPageComponent,   
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
