import { take } from 'rxjs/operators';
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

}
