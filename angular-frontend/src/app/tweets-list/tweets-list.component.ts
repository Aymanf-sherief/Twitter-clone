import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from '../api-client.service';


@Component({
  selector: 'app-tweets-list',
  templateUrl: './tweets-list.component.html',
  styleUrls: ['./tweets-list.component.css']
})
export class TweetsListComponent implements OnInit {
  data = 'test data';
  tweets: object;

  constructor(private ApiClient: ApiClientService) { }

  ngOnInit(): void {
  
     this.ApiClient.getUserTimeline().subscribe(data => {this.tweets = data;
    console.log(data)});
    
   

  }

}
