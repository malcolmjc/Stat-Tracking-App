import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameCreateListComponent } from './game/game-create-list/game-create-list.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GamePlayerSelectComponent } from './game/game-player-select/game-player-select.component';
import { MatchupPredictorComponent } from './user/matchup-predictor/matchup-predictor.component';
import { PredictorStatsComponent } from './user/predictor-stats/predictor-stats.component';
import { UserStatsComponent } from './user/user-stats/user-stats.component';

const routes: Routes = [
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
    component: UserStatsComponent
  },
  {
    path: 'select-players',
    component: GamePlayerSelectComponent
  },
  {
    path: 'predict-matchup',
    component: MatchupPredictorComponent
  },
  {
    path: 'predict-matchup/stats',
    component: PredictorStatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
