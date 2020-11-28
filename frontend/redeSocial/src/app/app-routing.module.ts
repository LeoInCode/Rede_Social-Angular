import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioResolver } from './shared/services/usuarios/usuario.resolver';
import { JogoResolver } from './shared/services/jogos/jogo.resolver';
import { JogoComponent } from './jogo/jogo.component';
import { PerfilComponent } from './perfil/perfil.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    loadChildren: () => import('./first-page/first-page.module').then((m) => m.FirstPageModule),
  },
  {
    path: 'home/:nick', component: HomeComponent,   
  },
  {
    path: 'jogo/:sigla', component: JogoComponent, resolve: { jogo: JogoResolver },
  },
  {
    path: ':nick', component: PerfilComponent, resolve: { user: UsuarioResolver },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
