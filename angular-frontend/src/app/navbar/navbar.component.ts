import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiClientService } from '../api-client.service';
import { map, tap, takeWhile } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  login: BehaviorSubject<boolean>;
  // this.ApiClient = ApiClientService;

  constructor(private ApiClient: ApiClientService, private router: Router, private cookies: CookieService) { }

  ngOnInit(): void {

  }

  handleLog(): void {
    console.log({ logged: this.ApiClient.isAuthorized })
    if (!this.ApiClient.isAuthorized) {
      this.router.navigate(['login']);
    }
    else {
      this.ApiClient.logout().subscribe(data => {
        this.ApiClient.isAuthorized = false;
        this.router.navigate(['login']);
      });

    }

  }

}
