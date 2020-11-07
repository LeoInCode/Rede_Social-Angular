import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

import { Jogo } from './../../../model/Jogo';
import { JogosService } from './../../services/jogos/jogos.service';
import { Observable } from 'rxjs';

@Injectable()
export class JogoResolver implements Resolve<Jogo> {
  constructor(private jogoService: JogosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let sigla = route.params['sigla'];

    return this.jogoService.getJogoBySigla(sigla);
  }
}
