import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule, MatRadioModule, MatSelectModule } from '@angular/material';

import { UserChartsModule } from '../user-charts/user-charts.module';
import { UserLeaderboardComponent } from './user-leaderboard.component';
import { UserStatsModule } from '../user-stats/user-stats.module';

@NgModule({
  imports: [
    CommonModule,
    UserChartsModule,
    UserStatsModule,
    MatRadioModule,
    MatCardModule,
    MatSelectModule
  ],
  declarations: [
    UserLeaderboardComponent
  ],
  exports: [
    UserLeaderboardComponent
  ]
})
export class UserLeaderboardModule { }
