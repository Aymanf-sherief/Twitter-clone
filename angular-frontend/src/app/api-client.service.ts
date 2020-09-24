import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { EmptyError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { LoginForm, SignUpForm } from './login/login.component';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class ApiClientService {


  constructor(private http: HttpClient, private cookies: CookieService, private router: Router) {
    this.options = {
      responseType: 'json' as const,
      withCredentials: true,

    };
    //this.authorize();
  }

  static user: User;
  static isAuthorized: boolean;

  options: object;
  API_ROOT = environment.api_root;



  authorize(): Observable<User> {
    if (ApiClientService.isAuthorized) { }
    const authObservable = this.http.get<User>(`${this.API_ROOT}-current-user/`, this.options);
    return authObservable;

  }

  get authorizedUSer(): User {
    return ApiClientService.user;
  }

  getUserTimeline(): Observable<object> {

    return this.http.get(`${this.API_ROOT}/tweets/`, this.options);
  }

  login(loginData: LoginForm): Observable<object> {

    const loginObservable = this.http.post<AuthResponse>(`${this.API_ROOT}-token-auth/`, loginData, this.options);

    return loginObservable;
  }

  signup(signupData: SignUpForm): Observable<object> {

    const signupObservable = this.http.post<User>(`${this.API_ROOT}/users/`, signupData, this.options);
    return signupObservable;
  }

  createTweet(content: string): Observable<object> {
    const createTweetObservable = this.http.post(`${this.API_ROOT}/tweets/`, { content }, this.options);
    return createTweetObservable;
  }
}





export interface AuthResponse {
  token: string;
}
export class User {
  constructor(
    public username: string,
    public email: string,
    public id: number,
    public bio: string,
    public following: Array<number>,
  ) { }
}