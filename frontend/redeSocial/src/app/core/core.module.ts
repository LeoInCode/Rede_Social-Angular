import { ContatosComponent } from './contatos/contatos.component';
import { FeedComponent } from './feed/feed.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    NavBarComponent,
    FeedComponent,
    ContatosComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
