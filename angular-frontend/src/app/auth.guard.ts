import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private ApiClient: ApiClientService, private cookies: CookieService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (ApiClientService.isAuthorized) {
      return true;
    }

    return this.ApiClient.authorize().pipe(map(() => {
      if (ApiClientService.isAuthorized) {
        return true;
      }
      else {

        this.router.navigate(['login']);
        return false;
      }
    }));




  }

}
export interface AuthResponse {
  token: string;
}