import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { PredictorStatsComponent } from './predictor-stats.component';
import { PredictorStatsResultsModule } from '../predictor-stats-results/predictor-stats-results.module';

@NgModule({
  declarations: [
    PredictorStatsComponent
  ],
  exports: [
    PredictorStatsComponent
  ],
  imports: [
    CommonModule,
    PredictorStatsResultsModule
  ]
})
export class PredictorStatsModule { }
