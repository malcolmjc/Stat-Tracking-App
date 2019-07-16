import { MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { PredictorStatsResultsComponent } from './predictor-stats-results.component';

@NgModule({
  declarations: [
    PredictorStatsResultsComponent
  ],
  exports: [
    PredictorStatsResultsComponent
  ],
  imports: [
    MatGridListModule
  ]
})
export class PredictorStatsResultsModule { }
