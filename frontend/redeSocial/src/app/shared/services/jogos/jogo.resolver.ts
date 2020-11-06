import { JogosService } from './../../services/jogos/jogos.service';
import { Usuario } from './../../../model/Usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable()
export class JogoResolver implements Resolve<Usuario> {
  constructor(private jogoService: JogosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let sigla = route.params['sigla'];

    return this.jogoService.getJogoBySigla(sigla);
  }
}
