import { CommonModule } from '@angular/common';
import { MatCardModule, MatGridListModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { ConvertNaNPipe } from 'src/app/pipes/convert-nan.pipe';
import { UserStatsComponent } from './user-stats.component';

@NgModule({
  declarations: [
    UserStatsComponent,
    ConvertNaNPipe
  ],
  exports: [
    UserStatsComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule
  ]
})
export class UserStatsModule { }
