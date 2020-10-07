import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../../model/Usuario';
import { delay, map, reduce, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  getUser(user: Usuario) {
    return this.http.get('http://localhost:3000/usuarios')
    .pipe(
      map((usuario: Usuario[]) => usuario.filter(v => v.email === user.email)),
      map((usuario: Usuario[]) => usuario.find(v => v.senha === user.senha)),
      take(1)
    );
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

}
