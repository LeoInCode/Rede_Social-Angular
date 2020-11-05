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
  feed: Feed;
  formulario: FormGroup;

  constructor(private route: ActivatedRoute,
              private userServicer: UsuariosService,
              private userContext: UserContextService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getUser();

    this.formulario = this.formBuilder.group({
      nick: [this.usuario.nick],
      nome: [this.usuario.nome],
      nickjogo: [null],
      mensagem: [null],
      urlfoto: ["../../../assets/Foto.jpg"]
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
  
  public(){
    
  }

}
