import { JogosService } from './../shared/services/jogos/jogos.service';
import { Jogo } from './../model/Jogo';
import { FeedService } from './../shared/services/feed/feed.service';
import { FormGroup, FormBuilder } from '@angular/forms';
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

    this.formulario = this.formBuilder.group({
      nick: [null],
      nome: [null],
      nickjogo: [null],
      mensagem: [null],
      urlfoto: [null]
    });
  }

  getUser(){
    if(this.userContext.user){
      this.usuario = this.userContext.user
    }else{
      this.id = this.route.snapshot.params['id'];
      this.userServicer.getUsuario(this.id).subscribe((data: Usuario) => {
        this.usuario = data;
        this.userContext.user = data;
      })
    }
  }

  getJogos(){
    this.jogoService.getJogos().subscribe((data: Jogo[]) => {
      this.jogos = [...data];
    })
  }
  
  publicar(){
    this.feedService.postFeed(this.formulario.value).subscribe((data: Feed) =>{
      console.log(data);
    })
  }

}
