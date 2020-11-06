import { Jogo } from './../../../model/Jogo';
import { take, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JogosService {

  URL: string = 'http://localhost:3000/jogos';

  constructor(private http: HttpClient) { }

  getJogos() {
    return this.http.get(this.URL).pipe(take(1));
  }

  getJogoBySigla(sigla: string) {
    return this.http.get(this.URL)
    .pipe(
      map((jogo: Jogo[]) => jogo.filter(v => v.sigla === sigla)),
      map((jogo: Jogo[]) => jogo.find(v => v.sigla === sigla)),
      take(1)
    );
  }

}
