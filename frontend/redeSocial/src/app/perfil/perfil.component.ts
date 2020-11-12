import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { FeedService } from './../shared/services/feed/feed.service';
import { Feed } from './../model/Feed';
import { Usuario } from './../model/Usuario';
import { JogosService } from './../shared/services/jogos/jogos.service';
import { Jogo } from './../model/Jogo';
import { UserContextService } from './../shared/services/usuarios/user-context.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario;
  feed: Feed[];
  jogos: Jogo[];


  constructor(private feedService: FeedService,
              private route: ActivatedRoute,
              private userContext: UserContextService,
              private jogoService: JogosService) { }

  ngOnInit(): void {
      this.getUser();
  }

  getUser(){
    this.route.data.subscribe(async (data: { user: Usuario }) => {
      this.usuario = await data.user;
      if(this.usuario === this.userContext.user){
        this.usuario = this.userContext.user;
      }
      this.getFeed();
      this.getJogos();
    })
  }

  getFeed() {
    this.feedService.getFeedByNickUser(this.usuario.nick).subscribe((data: Feed[]) => {
      this.feed = [...data];
    })
  }

  getJogos() {
    this.jogoService.getJogos().subscribe((data: Jogo[]) => {
      this.jogos = [...data];
    })
  }
}
