import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../api-client.service';


@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {

  constructor(private ApiClient: ApiClientService) { }
  data = 'test data';
  tweets: object;
  newTweet = "";

  ngOnInit(): void {

    this.ApiClient.getUserTimeline().subscribe(data =>

      this.tweets = data

    );

  }

  handleNewTweet(): void {
    this.ApiClient.createTweet(this.newTweet).subscribe
      (tweet => {
        console.log(tweet);
        this.tweets.count += 1;
        this.tweets.results.unshift(tweet);
        console.log('pushed');
        console.log(this.tweets);
        this.newTweet = '';
      });
  }

}
