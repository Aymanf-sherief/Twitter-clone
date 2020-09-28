import { Component, OnInit } from '@angular/core';
import { ApiClientService, User } from '../api-client.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {
  user: User;
  isAuthorized: boolean;


  constructor(private ApiClient: ApiClientService) { }

  ngOnInit(): void {
    this.user = this.ApiClient.user;
    this.isAuthorized = this.ApiClient.isAuthorized;
  }

}
