import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { UsuariosService } from './../shared/services/usuarios/usuarios.service';
import { FeedService } from './../shared/services/feed/feed.service';
import { Feed } from './../model/Feed';
import { Usuario } from './../model/Usuario';
import { JogosService } from './../shared/services/jogos/jogos.service';
import { Jogo } from './../model/Jogo';
import { UserContextService } from './../shared/services/usuarios/user-context.service';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

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
  faCamera = faCamera;
  faCaretSquareRight = faCaretSquareRight;
  cameraViewer: boolean = false;
  inputViewer: boolean = false;
  input: string;


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
        this.usuario.id != this.userContext.user.id ? this.verificaAmizade() : this.mostrarCamera();
      }else{
        this.adicionarJogadorMensagem();
      }
      this.getFeed();
      this.getJogos();
      this.insereFundoCss();
    })
  }

  mostrarCamera() {
    this.cameraViewer = true;
    this.inputViewer = false;
  }

  inserirCampo() {
    this.cameraViewer = false;
    this.inputViewer = true;
  }

  adicionarJogadorMensagem() {
    this.mensagemAmizade = "Adicionar jogador";
    this.mostrarBotaoAdicionar = true;
  }

  adicionarMensagemAmizade() {
    this.mensagemAmizade = "Enviar Mensagem";
    this.mostrarBotaoMensagem = true;
  }

  trocarCapa() {
    this.userContext.user.urlbackground = this.input;
    this.userService.alteraCapa(this.userContext.user).subscribe((data: Usuario) => this.userContext.user = data);
    this.cameraViewer = true;
    this.inputViewer = false;
  }

  getUsers() {
    this.userService.getUsers().subscribe((users: Usuario[]) => {
      this.users = users;
    })
  }

  verificaAmizade() {
    this.userService.verificaAmizade(this.userContext.user.nick,this.usuario.nick).subscribe(data => {
      data[0] ? this.adicionarMensagemAmizade() : this.adicionarJogadorMensagem();
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
      this.adicionarMensagemAmizade();
    })
  }
}
