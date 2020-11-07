import { UserContextService } from './../shared/services/usuarios/user-context.service';
import { ActivatedRoute } from '@angular/router';
import { FeedService } from './../shared/services/feed/feed.service';
import { Feed } from './../model/Feed';
import { Usuario } from './../model/Usuario';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario = new Usuario;
  feed: Feed[];


  constructor(private feedService: FeedService,
              private router: ActivatedRoute,
              private userContext: UserContextService) { }

  ngOnInit(): void {
    this.usuario = this.userContext.user;

  }

  getFeed() {
    this.feedService.getFeedByNickJogo(this.usuario.nick).subscribe((data: Feed[]) => {
      data.reverse();
      this.feed = [...data];
    })
  }
}
