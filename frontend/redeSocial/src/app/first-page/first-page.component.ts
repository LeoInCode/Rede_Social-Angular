import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  cadastro: boolean = true;
  login: boolean = false;
  @Input() cadastroCor: string = "secondary";
  @Input() loginCor: string = "info";

  constructor() { }

  ngOnInit(): void {
  }

  loginEstado(){
    this.cadastro = false;
    this.login = true;
    this.cadastroCor = "secondary";
    this.loginCor = "info";
  }

  cadastroEstado(){
    this.cadastro = true;
    this.login = false;
    this.cadastroCor = "info";
    this.loginCor = "secondary";
  }
}
