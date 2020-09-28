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
  followed: boolean;

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
          
        });
        console.log(this.ApiClient.user.following);
        console.log(this.username);

        this.followed = !(this.ApiClient.user.following.filter(obj => obj.username === this.username).length === 0);
        console.log(this.followed);



      }
      else {
        this.ApiClient.getUserTimeline().subscribe(data => {this.tweets = data;
        console.log(data)});
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

  handleFollow(): void {
    if (this.followed) {
      this.ApiClient.unfollowUser(this.username).subscribe
        (data => {
          if ('success' in data) {
            this.ApiClient.user.following = this.ApiClient.user.following.filter(obj => obj.username !== this.username);
            this.followed = false;
          }
        });
    }
    else {
      this.ApiClient.followUser(this.username).subscribe
        (data => {
          if ('success' in data) {
            console.log(data);
            this.ApiClient.user.following.push({ username: this.username });
            this.followed = true;
          }
        });
    }
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