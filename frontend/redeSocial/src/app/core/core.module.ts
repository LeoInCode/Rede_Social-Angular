import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContatosComponent } from './contatos/contatos.component';
import { FeedComponent } from './feed/feed.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    NavBarComponent,
    FeedComponent,
    ContatosComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavBarComponent,
    FeedComponent,
    ContatosComponent
  ]
})
export class CoreModule { }
