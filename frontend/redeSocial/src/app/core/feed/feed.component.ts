import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

import { Feed } from './../../model/Feed';

@Component({
  selector: 'app-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() feed: Feed[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  trackById(index: number, item: Feed) {
    return item.id;
  }

}
