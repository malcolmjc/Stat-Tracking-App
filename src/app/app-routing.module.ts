import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from "./auth/auth.guard";
import { GameCreateListComponent } from './game/game-create-list/game-create-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GamePlayerSelectComponent } from './game/game-player-select/game-player-select.component';
import { LoginComponent } from "./auth/login/login.component";
import { MatchupPredictorComponent } from './user/matchup-predictor/matchup-predictor.component';
import { PredictorStatsComponent } from './user/predictor-stats/predictor-stats.component';
import { SignupComponent } from "./auth/signup/signup.component";
import { UserStatsComponent } from './user/user-stats/user-stats.component';

const routes: Routes = [
  {
    path: '',
    component: GameListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: GameCreateListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'leaderboard',
    component: UserStatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'select-players',
    component: GamePlayerSelectComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'predict-matchup',
    component: MatchupPredictorComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'predict-matchup/stats',
    component: PredictorStatsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
