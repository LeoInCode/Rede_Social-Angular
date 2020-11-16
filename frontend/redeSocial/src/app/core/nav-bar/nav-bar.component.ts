import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import { Jogo } from './../../model/Jogo';
import { Usuario } from './../../model/Usuario';
import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() jogos: Jogo[];
  @Input() usuarios: Usuario[];
  @Input() jogosList: Jogo[];
  users: Usuario[];
  nick: string;
  faGripLinesVertical = faGripLinesVertical;
  viewGrips: boolean = false;


  constructor(private router: Router,
              private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void { }

  navigateJogo(jogo: string) {
    this.router.navigate(['jogo', jogo]);
  }

  navigatePerfil(user: string) {
    this.router.navigate(['',user]);
  }

  set findUserOrJogo(name: string) {
    this.nick = name;
    
    this.jogosList = this.jogos.filter((jogo: Jogo) =>
    jogo.nickjogo.toLocaleLowerCase().indexOf(this.nick.toLocaleLowerCase()) > -1)
    
    this.users = this.usuarios.filter((user: Usuario) =>
    user.nick.toLocaleLowerCase().indexOf(this.nick.toLocaleLowerCase()) > -1).slice(0,4);
    this.viewGrips = true;
    setTimeout(() => {
      this.users = null;
      this.viewGrips = false;
      this.changeDetector.detectChanges();
    },3000)
  }

  get findUserOrJogo() {
    return this.nick;
  }
}
