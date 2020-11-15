import { delay } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Usuario } from './../model/Usuario';
import { UsuariosService } from './../shared/services/usuarios/usuarios.service';
import { UserContextService } from './../shared/services/usuarios/user-context.service';
import { JogosService } from './../shared/services/jogos/jogos.service';
import { Jogo } from './../model/Jogo';
import { FeedService } from './../shared/services/feed/feed.service';
import { Feed } from './../model/Feed';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  usuario: Usuario;
  feed: Feed[] = [];
  formulario: FormGroup;
  jogos: Jogo[] = [];
  users: Usuario[] = [];
  contatos: Usuario[] = [];

  constructor(private route: ActivatedRoute,
              private userServicer: UsuariosService,
              private userContext: UserContextService,
              private formBuilder: FormBuilder,
              private feedService: FeedService,
              private jogoService: JogosService,
              private usersService: UsuariosService,
              private router: Router) { }

  ngOnInit(): void {
    this.getUser();
    this.getJogos();
    this.getFeed();
    this.getUsers();
  }

  getUser(){
    if(this.userContext.user){
      this.usuario = this.userContext.user
      this.iniciaFormulario();
    }else{
      const nick = this.route.snapshot.params['nick'];
      this.userServicer.getUserByNick(nick).subscribe(async (data: Usuario) => {
        this.usuario = await data;
        this.userContext.user = await data;
        this.iniciaFormulario();
      })
    }
  }

  iniciaFormulario() {
    this.formulario = this.formBuilder.group({
      nick: [this.usuario.nick],
      nome: [this.usuario.nome],
      nickjogo: [null, [Validators.required]],
      mensagem: [null],
      urlfotoperfil: [this.usuario.urlperfil],
      urlfotojogo: [null]
    });
  }

  getJogos(){
    this.jogoService.getJogos().subscribe((data: Jogo[]) => {
      this.jogos = [...data];
    })
  }

  getFeed() {
    this.feedService.getFeed().subscribe((data: Feed[]) => {
      data.reverse();
      this.feed = [...data];
    })
  }

  getUsers() {
    this.usersService.getUsers().subscribe(async (users: Usuario[]) => {
      this.users = await users;
      this.buscaAmigos();
    })
  }
  
  publicar(){
    this.feedService.postFeed(this.formulario.value).subscribe((data: Feed) =>{
      this.feed.unshift(data);
    })
    this.resetaDadosForm();
  }

  resetaDadosForm() {
    this.formulario.patchValue({
      nick: this.usuario.nick,
      nome: this.usuario.nome,
      nickjogo: null,
      mensagem: null,
      urlfotoperfil: this.usuario.urlperfil,
      urlfotojogo: null
    });
  }

  navigatePerfil() {
    this.router.navigate(['',this.userContext.user.nick]);
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