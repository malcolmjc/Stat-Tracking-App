import { NgModule } from '@angular/core';

import { PlayerSelectionFormFieldModule } from './player-selection-form-field/player-selection-form-field.module';
import { UserLeaderboardModule } from './user-leaderboard/user-leaderboard.module';

@NgModule({
  exports: [
    PlayerSelectionFormFieldModule,
    UserLeaderboardModule
  ]
})
export class UserModule { }
