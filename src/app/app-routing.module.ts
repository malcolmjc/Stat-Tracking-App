import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameCreateComponent } from './game/game-create/game-create.component';
import { UserStatsComponent } from './user/user-stats/user-stats.component';
import { GameCreateListComponent } from './game/game-create-list/game-create-list.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
