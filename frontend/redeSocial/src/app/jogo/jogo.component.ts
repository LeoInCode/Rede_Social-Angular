import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Jogo } from './../model/Jogo';
import { JogosService } from './../shared/services/jogos/jogos.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  jogos: Jogo[];
  sigla: string;
  jogo: Jogo = new Jogo;

  constructor(private jogoService: JogosService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.jogoService.getJogos().subscribe((data: Jogo[]) => {
      this.jogos = [...data];
    })
    this.getJogo();
  }

  getJogo(){
    this.sigla = this.route.snapshot.params['sigla']; 
    this.jogoService.getJogoBySigla(this.sigla).subscribe(async (data: Jogo) => {
      this.jogo = await data;
      this.insereCapaCss();
    })
  }

  insereCapaCss() {
    document.getElementById('background-image').style.backgroundImage = "url("+this.jogo.urlcapa+")";
  }
}
