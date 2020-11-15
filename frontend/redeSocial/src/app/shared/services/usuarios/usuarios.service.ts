import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Usuario } from '../../../model/Usuario';
import { delay, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  URL: string = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.URL).pipe(take(1))
  }

  verificaUsuario(user: Usuario) {
    return this.http.get(this.URL)
    .pipe(
      map((usuario: Usuario[]) => usuario.filter(v => v.email === user.email)),
      map((usuario: Usuario[]) => usuario.find(v => v.senha === user.senha)),
      take(1)
    );
  }

  getUserByNick(nick: string) {
    return this.http.get(this.URL)
    .pipe(
      map((usuario: Usuario[]) => usuario.filter(v => v.nick === nick)),
      map((usuario: Usuario[]) => usuario.find(v => v.nick === nick)),
      take(1)
    );
  }

  postUser(user: Usuario) {
    return this.http.post(this.URL, user).pipe(take(1))
  }

  verificarEmail(email: string) {
    return this.http.get(this.URL)
    .pipe(
      delay(4000),
      map((usuario: Usuario[]) => usuario.filter(v => v.email === email)),
      map((usuario: Usuario[]) => usuario.length > 0),
      take(1)
    );
  }

  verificaAmizade(nickPerfil: string, nickJogador: string) {
    return this.http.get(this.URL)
    .pipe(
      map((usuario: Usuario[]) => usuario.filter(v => v.nick === nickPerfil)),
      map((usuario: Usuario[]) => usuario.map(v => v.contatos.includes(nickJogador))),
      take(1)
    )
  }

  adicionarContato(user: Usuario) {
    return this.http.put(this.URL +"/"+ user.id, user).pipe(take(1))
  }
}
