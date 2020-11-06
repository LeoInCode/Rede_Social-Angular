import { JogosService } from './../shared/services/jogos/jogos.service';
import { Jogo } from './../model/Jogo';
import { FeedService } from './../shared/services/feed/feed.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Feed } from './../model/Feed';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usuario } from './../model/Usuario';
import { UsuariosService } from './../shared/services/usuarios/usuarios.service';
import { UserContextService } from './../shared/services/usuarios/user-context.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: number
  usuario: Usuario;
  feed: Feed[];
  formulario: FormGroup;
  jogos: Jogo[];

  constructor(private route: ActivatedRoute,
              private userServicer: UsuariosService,
              private userContext: UserContextService,
              private formBuilder: FormBuilder,
              private feedService: FeedService,
              private jogoService: JogosService) { }

  ngOnInit(): void {
    this.getUser();
    this.getJogos();
    this.getFeed();
    
  }

  getUser(){
    if(this.userContext.user){
      this.usuario = this.userContext.user
    }else{
      this.id = this.route.snapshot.params['id'];
      this.userServicer.getUsuario(this.id).subscribe(async (data: Usuario) => {
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
      urlfotoperfil: [this.usuario.urlfoto],
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
      this.feed = [...data];
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
      urlfotoperfil: this.usuario.urlfoto,
      urlfotojogo: null
    });
  }
}
