import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiClientService, User } from './api-client.service';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ApiClient: ApiClientService, private cookies: CookieService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.ApiClient.isAuthorized === true) {
      return true;
    }

    return this.ApiClient.authorize().pipe(map(
      resp => {
        this.ApiClient.user = User.fromResponse(resp);
        this.ApiClient.isAuthorized = true;
        console.log({auth: this.ApiClient.isAuthorized});

        return 'username' in resp;
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        this.router.navigate(['login']);
        return of(false);
      }
      ));





  }

}
export interface AuthResponse {
  token: string;
}