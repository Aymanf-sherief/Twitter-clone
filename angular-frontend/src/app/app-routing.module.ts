import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TweetsListComponent } from './tweets-list/tweets-list.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', component: TweetsListComponent,  canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
