import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddMemberComponent } from './groups/add-member/add-member.component';
import { AppRootComponent } from './app-root.component';
import { AuthGuard } from './auth/auth.guard';
import { CreateGroupComponent } from './groups/create-group/create-group.component';
import { GameCreateListComponent } from './game/game-create-list/game-create-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GamePlayerSelectComponent } from './game/game-player-select/game-player-select.component';
import { GroupComponent } from './groups/group/group.component';
import { GroupHomepageComponent } from './groups/group-homepage/group-homepage.component';
import { JoinGroupComponent } from './groups/join-group/join-group.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { UserLeaderboardComponent } from './user/user-leaderboard/user-leaderboard.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    component: AppRootComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GameListComponent
      },
      {
        path: 'create',
        component: GameCreateListComponent
      },
      {
        path: 'leaderboard',
        component: UserLeaderboardComponent,
      },
      {
        path: 'select-players',
        component: GamePlayerSelectComponent,
      },
      {
        path: 'my-groups',
        component: GroupHomepageComponent
      },
      {
        // Group Id should be provided in query params
        path: 'group',
        component: GroupComponent
      },
      {
        path: 'create-group',
        component: CreateGroupComponent
      },
      {
        path: 'join-group',
        component: JoinGroupComponent
      },
      {
        path: 'add-member',
        component: AddMemberComponent
      },
      {
        path: 'my-profile',
        component: UserProfileComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
