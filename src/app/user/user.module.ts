import { NgModule } from '@angular/core';

import { MatchupPredictorModule } from './matchup-predictor/matchup-predictor.module';
import { PlayerSelectionFormFieldModule } from './player-selection-form-field/player-selection-form-field.module';
import { PredictorStatsModule } from './predictor-stats/predictor-stats.module';
import { UserStatsModule } from './user-stats/user-stats.module';

@NgModule({
  exports: [
    MatchupPredictorModule,
    PlayerSelectionFormFieldModule,
    PredictorStatsModule,
    UserStatsModule
  ]
})
export class UserModule { }
