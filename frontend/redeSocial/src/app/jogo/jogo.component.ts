import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Jogo } from './../model/Jogo';
import { JogosService } from './../shared/services/jogos/jogos.service';
import { UserContextService } from './../shared/services/usuarios/user-context.service';
import { Usuario } from './../model/Usuario';
import { Feed } from './../model/Feed';
import { FeedService } from './../shared/services/feed/feed.service';
import { UsuariosService } from './../shared/services/usuarios/usuarios.service';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faCaretSquareRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  jogos: Jogo[];
  sigla: string;
  jogo: Jogo = new Jogo;
  feed: Feed[];
  users: Usuario[];
  contatos: Usuario[] = [];
  faCamera = faCamera;
  faCaretSquareRight = faCaretSquareRight;
  cameraViewer: boolean = true;
  inputViewer: boolean = false;
  input: string;

  constructor(private jogoService: JogosService,
              private route: ActivatedRoute,
              private feedService: FeedService,
              private userContext: UserContextService,
              private usersService: UsuariosService) { }

  ngOnInit(): void {
    this.jogoService.getJogos().subscribe((data: Jogo[]) => {
      this.jogos = [...data];
    })
    this.getJogo();
    this.getUsers();
  }

  getJogo(){
    this.route.data.subscribe(async (data: { jogo: Jogo }) => {
      this.jogo = await data.jogo;
      this.insereCapaCss();
      this.getFeed();
    })
  }

  inserirCampo() {
    this.cameraViewer = false;
    this.inputViewer = true;
  }

  trocarCapa() {
    this.jogo.urlcapa = this.input;
    this.jogoService.alteraCapa(this.jogo).subscribe((data: Jogo) => this.jogo = data);
    this.cameraViewer = true;
    this.inputViewer = false;
  }

  getUsers() {
    this.usersService.getUsers().subscribe(async (users: Usuario[]) => {
      this.users = await users;
      this.buscaAmigos();
    })
  }

  insereCapaCss() {
    document.getElementById('background-image').style.backgroundImage = "url("+this.jogo.urlcapa+")";
  }

  getFeed() {
    this.feedService.getFeedByNickJogo(this.jogo.nickjogo).subscribe((data: Feed[]) => {
      data.reverse();
      this.feed = [...data];
    })
  }
  
  buscaAmigos() {
    this.userContext.user.contatos.forEach((contato) => {
      this.users.forEach((user) => {
        if (contato === user.nick){
          this.contatos.push(user);
        }
      })
    })
  }
}
