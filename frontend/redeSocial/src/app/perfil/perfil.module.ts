import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CoreModule } from './../core/core.module';
import { UsuarioResolver } from './../shared/services/usuarios/usuario.resolver';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule,
    FontAwesomeModule,
  ],
  providers: [UsuarioResolver],
})
export class PerfilModule { }
