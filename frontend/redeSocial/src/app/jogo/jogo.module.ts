import { JogoResolver } from './../shared/services/jogos/jogo.resolver';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from './../core/core.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreModule
  ],
  providers: [JogoResolver],
})
export class JogoModule { }
