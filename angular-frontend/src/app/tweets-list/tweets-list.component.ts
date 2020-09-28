import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiClientService, User } from '../api-client.service';


@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {
  username = '';
  user: User;

  constructor(private ApiClient: ApiClientService, private route: ActivatedRoute) { }
  tweets: Tweets;
  newTweet = '';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if ('username' in params) {
        this.username = params.username;
        this.ApiClient.getUserData(this.username).subscribe(data => {
          this.user = data;
          console.log(this.user);
          this.ApiClient.getUserTweets(this.username).subscribe(tweets => this.tweets = tweets);
        }
        );
      }
      else {
        this.ApiClient.getUserTimeline().subscribe(data => this.tweets = data);
      }
    });
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