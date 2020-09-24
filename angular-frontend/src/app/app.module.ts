import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth.guard';

import { TweetsListComponent } from './tweets-list/tweets-list.component';
import { LoginComponent, LoginForm, SignUpForm } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    TweetsListComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
