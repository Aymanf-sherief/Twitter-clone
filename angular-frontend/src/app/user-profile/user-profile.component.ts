import { Component, OnInit } from '@angular/core';
import { ApiClientService, User } from '../api-client.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  constructor(private ApiClient: ApiClientService) { }

  ngOnInit(): void {
    this.ApiClient.authorizedUSer.subscribe((data) => {
      this.user = data
      console.log(this.user)
    });
  }

}
