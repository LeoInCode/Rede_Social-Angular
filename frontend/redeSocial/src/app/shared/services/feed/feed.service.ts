import { Feed } from './../../../model/Feed';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  URL: string = 'http://localhost:3000/feed';

  constructor(private http: HttpClient) { }

  getFeed() {
    return this.http.get(this.URL).pipe(take(1));
  }

  postFeed(feed: Feed){
    return this.http.post(this.URL, feed).pipe(take(1))
  }
}
