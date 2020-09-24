import { ThrowStmt } from '@angular/compiler';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClientService } from '../api-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private ApiClient: ApiClientService, private router: Router
  ) { }
  loginData: LoginForm = new LoginForm();
  signUpData: SignUpForm = new SignUpForm();
  login = true;
  errors = '';
  ngOnInit(): void {
  }

  handleLogin(): void {
    this.ApiClient.login(this.loginData).subscribe(data => {
      if ('token' in data) {
        this.router.navigate(['']);
      }
    },
      error => this.errors = error.error.non_field_errors[0]);
  }
  handleSignUp(): void {
    this.ApiClient.signup(this.signUpData).subscribe(data => {
      if ('username' in data && 'password' in data) {
        this.loginData = this.signUpData;
        this.handleLogin();
      }
    });

  }

}


export class LoginForm {
  constructor(
    public username: string = '',
    public password: string = '',
  ) { }
}

export class SignUpForm {
  constructor(
    public username: string = '',
    public email: string = '',
    public bio: string = '',
    public password: string = '',

  ) { }
}
