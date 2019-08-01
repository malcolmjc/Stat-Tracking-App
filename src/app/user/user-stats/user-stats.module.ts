import { CommonModule } from '@angular/common';
import { MatGridListModule, MatSelectModule, MatRadioModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { UserStatsComponent } from './user-stats.component';
import { ConvertNaNPipe } from 'src/app/pipes/convert-nan.pipe';

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
    MatGridListModule,
    MatSelectModule,
    MatCardModule,
    MatRadioModule
  ]
})
export class UserStatsModule { }
