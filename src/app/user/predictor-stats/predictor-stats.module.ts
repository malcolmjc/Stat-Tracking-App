import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { PredictorStatsComponent } from './predictor-stats.component';

@NgModule({
  declarations: [
    PredictorStatsComponent
  ],
  exports: [
    PredictorStatsComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ]
})
export class PredictorStatsModule { }
