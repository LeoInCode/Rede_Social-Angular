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
  users: Usuario[];
  mensagemAmizade: string = "Enviar Mensagem";
  mostrarBotaoAdicionar: boolean = false;
  mostrarBotaoMensagem: boolean = false;


  constructor(private feedService: FeedService,
              private route: ActivatedRoute,
              private userContext: UserContextService,
              private jogoService: JogosService,
              private userService: UsuariosService) { }

  ngOnInit(): void {
      this.getUser();
      this.getUsers();
  }

  getUser(){
    this.route.data.subscribe(async (data: { user: Usuario }) => {
      this.usuario = await data.user;
      if(this.userContext.user){
        if(this.usuario.id != this.userContext.user.id){
          this.verificaAmizade();
        }
      }else{
        this.mensagemAmizade = "Adicionar jogador";
        this.mostrarBotaoAdicionar = true;
      }
      this.getFeed();
      this.getJogos();
      this.insereFundoCss();
    })
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: Usuario[]) => {
      this.users = users;
    })
  }

  verificaAmizade() {
    this.userService.verificaAmizade(this.userContext.user.nick,this.usuario.nick).subscribe(data => {
      if(data[0]){
        this.mensagemAmizade = "Enviar Mensagem";
        this.mostrarBotaoMensagem = true;
      }else{
        this.mensagemAmizade = "Adicionar jogador";
        this.mostrarBotaoAdicionar = true;
      }
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
  
  insereFundoCss() {
    document.getElementById('background-image').style.backgroundImage = "url("+this.usuario.urlbackground+")";
  }

  adicionarContato() {
    this.userContext.user.contatos.push(this.usuario.nick);
    this.userService.adicionarContato(this.userContext.user).subscribe((data: Usuario) => {
      this.userContext.user = data;
      this.mostrarBotaoAdicionar = false;
      this.mostrarBotaoMensagem = true;
      this.mensagemAmizade = "Enviar Mensagem"
    })
  }
}
