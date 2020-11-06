import { Feed } from './../model/Feed';
import { FeedService } from './../shared/services/feed/feed.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Jogo } from './../model/Jogo';
import { JogosService } from './../shared/services/jogos/jogos.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.css']
})
export class JogoComponent implements OnInit {

  jogos: Jogo[];
  sigla: string;
  jogo: Jogo = new Jogo;
  feed: Feed[];

  constructor(private jogoService: JogosService,
              private route: ActivatedRoute,
              private feedService: FeedService) { }

  ngOnInit(): void {
    this.jogoService.getJogos().subscribe((data: Jogo[]) => {
      this.jogos = [...data];
    })
    this.getJogo();
  }

  getJogo(){
    this.route.data.subscribe(async (data: { jogo: Jogo }) => {
      this.jogo = await data.jogo;
      this.insereCapaCss();
      this.getFeed();
    })
  }

  insereCapaCss() {
    document.getElementById('background-image').style.backgroundImage = "url("+this.jogo.urlcapa+")";
  }

  getFeed() {
    this.feedService.getFeedByNick(this.jogo.nickjogo).subscribe((data: Feed[]) => {
      data.reverse();
      this.feed = [...data];
    })
  }
}
