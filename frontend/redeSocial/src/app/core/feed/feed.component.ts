import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { Feed } from './../../model/Feed';

@Component({
  selector: 'app-feed',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {

  @Input() feed: Feed[] = [];

  constructor(private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.changeDetection.detectChanges();
  }

  trackById(index: number, item: Feed) {
    return item.id;
  }

}
