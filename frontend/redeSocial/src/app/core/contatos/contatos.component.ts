import { Usuario } from './../../model/Usuario';
import { Jogo } from './../../model/Jogo';
import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {

  @Input() usuarios: Usuario[];
  @Input() users: Usuario[];
  nick: string;

  constructor() { }

  ngOnInit(): void {
  }

  set findUser(name: string) {
    this.nick = name;
    
    this.users = this.usuarios.filter((user: Usuario) =>
    user.nick.toLocaleLowerCase().indexOf(this.nick.toLocaleLowerCase()) > -1);
  }

  get findUser() {
    return this.nick;
  }

}
