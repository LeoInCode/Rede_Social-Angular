import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FirstPageModule } from './first-page/first-page.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { FeedComponent } from './core/feed/feed.component';
import { ContatosComponent } from './core/contatos/contatos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    FeedComponent,
    ContatosComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FirstPageModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
