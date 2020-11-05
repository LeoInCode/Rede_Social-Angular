import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Jogo } from './../../model/Jogo';

@Component({
  selector: 'app-nav-bar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() jogos: Jogo[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
