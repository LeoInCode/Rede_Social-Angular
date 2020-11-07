import { UsuariosService } from './usuarios.service';
import { Usuario } from './../../../model/Usuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';

@Injectable()
export class UsuarioResolver implements Resolve<Usuario> {
  constructor(private userService: UsuariosService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    let nick = route.params['nick'];

    return this.userService.getUserByNick(nick);
  }
}
