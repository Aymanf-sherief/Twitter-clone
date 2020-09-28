import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';


@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  constructor(private ApiClient: ApiClientService) { }
  tweets: Tweets;
  newTweet = '';

  ngOnInit(): void {

    this.ApiClient.getUserTimeline().subscribe(data => this.tweets = data);

  }

  handleNewTweet(): void {
    this.ApiClient.createTweet(this.newTweet).subscribe
      (tweet => {
        this.tweets.count += 1;
        this.tweets.results.unshift(tweet);
        this.newTweet = '';
      });
  }

}

export class Tweets {

  constructor(public count: number,
    public next: string,
    public prev: string,
    public results: Array<Tweet>,

  ) { }
}


export class Tweet {

  constructor(public id: number,
    public content: string,
    public username: string,

  ) { }
}