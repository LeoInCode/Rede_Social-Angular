import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UsuariosService } from './../shared/services/usuarios/usuarios.service';
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
  mensagemAmizade: string = "Enviar Mensagem";
  mostrarBotao: boolean = true;


  constructor(private feedService: FeedService,
              private route: ActivatedRoute,
              private userContext: UserContextService,
              private jogoService: JogosService,
              private userService: UsuariosService) { }

  ngOnInit(): void {
      this.getUser();
  }

  getUser(){
    this.route.data.subscribe(async (data: { user: Usuario }) => {
      this.usuario = await data.user;
      if(this.userContext.user){
        this.usuario.id != this.userContext.user.id ? this.verificaAmizade() : this.mostrarBotao = false;
      }else{
        this.mensagemAmizade = "Adicionar jogador";
      }
      this.getFeed();
      this.getJogos();
    })
  }

  verificaAmizade() {
    this.userService.verificaAmizade(this.userContext.user.nick,this.usuario.nick).subscribe(data => {
      data[0] ? this.mensagemAmizade = "Enviar Mensagem" : this.mensagemAmizade = "Adicionar jogador"
    });
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
