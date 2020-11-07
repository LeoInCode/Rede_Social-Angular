import { Router } from '@angular/router';
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

  constructor(private changeDetection: ChangeDetectorRef,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngDoCheck() {
    this.changeDetection.detectChanges();
  }

  navigatePerfil(feed: Feed) {
    this.router.navigate(['',feed.nick]);
  }
}
