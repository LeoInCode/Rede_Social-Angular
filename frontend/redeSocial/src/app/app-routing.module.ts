import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { CadastroComponent } from './first-page/cadastro/cadastro.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './first-page/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: NavBarComponent
  },
  {
    path: 'nav-bar', component: NavBarComponent,   
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
