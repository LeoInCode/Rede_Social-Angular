import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../../model/Usuario';
import { delay, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  verificaUsuario(user: Usuario) {
    return this.http.get('http://localhost:3000/usuarios')
    .pipe(
      map((usuario: Usuario[]) => usuario.filter(v => v.email === user.email)),
      map((usuario: Usuario[]) => usuario.find(v => v.senha === user.senha)),
      take(1)
    );
  }

  getUsuario(id: number) {
    return this.http.get('http://localhost:3000/usuarios/' + id);
  }

  postUser(user: Usuario) {
    return this.http.post('http://localhost:3000/usuarios', user).pipe(take(1))
  }

  putUser(user: Usuario) {
    return this.http.put('http://localhost:3000/usuarios/' + user.id, user).pipe(take(1))
  }

  deleteUser(id: number) {
    return this.http.delete('http://localhost:3000/usuarios/' + id).pipe(take(1))
  }

  verificarEmail(email: string) {
    return this.http.get('http://localhost:3000/usuarios')
    .pipe(
      delay(3000),
      map((usuario: Usuario[]) => usuario.filter(v => v.email === email)),
      map((usuario: any[]) => usuario.length > 0),
      take(1)
    );
  }
}
