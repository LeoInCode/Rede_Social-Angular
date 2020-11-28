import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../core/core.module';
import { JogoResolver } from './../shared/services/jogos/jogo.resolver';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule
  ],
  providers: [JogoResolver],
})
export class JogoModule { }
