import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { EmptyError, Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { LoginForm, SignUpForm } from './login/login.component';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Tweet, Tweets } from './tweets-list/tweets-list.component';

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

  user: User;
  isAuthorized: boolean;

  options: object;
  API_ROOT = environment.api_root;



  authorize(): Observable<User> {
    if (this.isAuthorized) { }
    const authObservable = this.http.get<User>(`${this.API_ROOT}/current-user/`, this.options);
    return authObservable;

  }

  get authorizedUSer(): User {
    return this.user;
  }

  getUserData(username: string): Observable<User> {

    return this.http.get<User>(`${this.API_ROOT}/users/${username}/`, this.options);
  }

  getUserTimeline(): Observable<Tweets> {

    return this.http.get<Tweets>(`${this.API_ROOT}/tweets/`, this.options);
  }
  getUserTweets(username: string): Observable<Tweets> {
    const optionsWithParams = {
      ...this.options,
      params: { username }
    };
    return this.http.get<Tweets>(`${this.API_ROOT}/tweets/`, optionsWithParams);
  }

  login(loginData: LoginForm): Observable<AuthResponse> {

    const loginObservable = this.http.post<AuthResponse>(`${this.API_ROOT}/token-auth/`, loginData, this.options);

    return loginObservable;
  }

  signup(signupData: SignUpForm): Observable<User> {

    const signupObservable = this.http.post<User>(`${this.API_ROOT}/users/`, signupData, this.options);
    return signupObservable;
  }

  logout(): Observable<any> {

    const logoutObservable = this.http.post(`${this.API_ROOT}/logout-user/`, {}, this.options);
    return logoutObservable;
  }

  createTweet(content: string): Observable<Tweet> {
    const createTweetObservable = this.http.post<Tweet>(`${this.API_ROOT}/tweets/`, { content }, this.options);
    return createTweetObservable;
  }

  followUser(username: string): Observable<User> {
    const followUserObservable = this.http.patch<User>(`${this.API_ROOT}/users/${username}/follow/`, {}, this.options);
    return followUserObservable;
  }
  unfollowUser(username: string): Observable<User> {
    const followUserObservable = this.http.patch<User>(`${this.API_ROOT}/users/${username}/unfollow/`, {}, this.options);
    return followUserObservable;
  }
}




export class User {

  constructor(
    public username: string = '',
    public email: string = '',
    public id: number = -1,
    public bio: string = '',
    public following: Array<{username: string}> = new Array(),
  ) { }

  static fromResponse(respObject: object): User {
    const user = new User();
    for (const field in respObject) {
      if (field in user) {
        user[field] = respObject[field];

      }
    }
    return user;
  }
}




export class AuthResponse {
  constructor(public token: string) { }

}
