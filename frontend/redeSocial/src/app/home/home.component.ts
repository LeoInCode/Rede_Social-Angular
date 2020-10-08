import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Usuario } from './../model/Usuario';
import { UsuariosService } from './../shared/services/usuarios/usuarios.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id: number
  usuario: Usuario[];

  constructor(
    private route: ActivatedRoute,
    private userServicer: UsuariosService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.userServicer.getUsuario(this.id).subscribe((data: Usuario[]) => {
      this.usuario = data;
      console.log(this.usuario);
    })
   
  }

}
