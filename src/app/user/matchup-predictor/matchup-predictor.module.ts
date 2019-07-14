import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { MatchupPredictorComponent } from './matchup-predictor.component';
import { PlayerSelectionFormFieldModule } from '../player-selection-form-field/player-selection-form-field.module';

@NgModule({
  declarations: [
    MatchupPredictorComponent
  ],
  exports: [
    MatchupPredictorComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    PlayerSelectionFormFieldModule
  ]
})
export class MatchupPredictorModule { }
