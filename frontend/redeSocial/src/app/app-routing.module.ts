import { JogoComponent } from './jogo/jogo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { CadastroComponent } from './first-page/cadastro/cadastro.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { LoginComponent } from './first-page/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: JogoComponent
  },
  {
    path: 'home', component: HomeComponent,   
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
