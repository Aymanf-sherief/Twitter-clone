import { Component , OnInit } from '@angular/core';
import { ApiClientService, User } from './api-client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Twitter Clone';
  user: User;

  constructor(private ApiClient: ApiClientService) { }

  ngOnInit(): void {

    this.ApiClient.authorizedUSer.subscribe(data => {
      this.user = data;
      console.log(data)
    });



  }
}

