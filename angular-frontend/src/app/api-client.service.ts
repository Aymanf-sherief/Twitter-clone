import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})

export class ApiClientService {

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.options = {
      responseType: 'json' as const,
      withCredentials: true,
    };
    this.authorize();
  }

  static user: Observable<User>;

  options: object;
  API_ROOT = environment.api_root;



  authorize(): Observable<User> {
    ApiClientService.user = this.http.get<User>(`${this.API_ROOT}-current-user/`, this.options);
    console.log(ApiClientService.user)

    return ApiClientService.user;

  }

  static get isAuthorized(): boolean {
    return ApiClientService.user ? true : false;
  }

  get authorizedUSer(): Observable<User> {
    return ApiClientService.user;
  }

  getUserTimeline(): Observable<object> {

    return this.http.get(`${this.API_ROOT}/tweets/`, this.options);
  }
}
export interface AuthResponse {
  token: string;
}
export interface User {
  username: string;
  email: string;
  id: number;
  bio: string;
  following: Array<number>;
}