import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { TweetsListComponent } from './tweets-list/tweets-list.component';

const routes: Routes = [
  { path: '', component: TweetsListComponent },
  { path: 'user', component: UserProfileComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
