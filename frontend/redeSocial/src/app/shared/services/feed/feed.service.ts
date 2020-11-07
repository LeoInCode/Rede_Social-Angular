import { Feed } from './../../../model/Feed';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  URL: string = 'http://localhost:3000/feed';

  constructor(private http: HttpClient) { }

  getFeed() {
    return this.http.get(this.URL).pipe(take(1));
  }

  getFeedByNickJogo(nick: string) {
    return this.http.get(this.URL)
    .pipe(
      map((feed: Feed[]) => feed.filter(v => v.nickjogo === nick)),
      take(1)
    );
  }

  getFeedByNickUser(nick: string) {
    return this.http.get(this.URL)
    .pipe(
      map((feed: Feed[]) => feed.filter(v => v.nick === nick)),
      take(1)
    );
  }

  postFeed(feed: Feed){
    return this.http.post(this.URL, feed).pipe(take(1));
  }
}
