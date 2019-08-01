import { NgModule } from '@angular/core';

import { PlayerSelectionFormFieldModule } from './player-selection-form-field/player-selection-form-field.module';
import { UserStatsModule } from './user-stats/user-stats.module';

@NgModule({
  exports: [
    PlayerSelectionFormFieldModule,
    UserStatsModule
  ]
})
export class UserModule { }
