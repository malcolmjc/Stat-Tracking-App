import { NgModule } from '@angular/core';

import { PlayerSelectionFormFieldModule } from './player-selection-form-field/player-selection-form-field.module';
import { UserLeaderboardModule } from './user-leaderboard/user-leaderboard.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@NgModule({
  exports: [
    PlayerSelectionFormFieldModule,
    UserLeaderboardModule,
    UserProfileModule
  ]
})
export class UserModule { }
