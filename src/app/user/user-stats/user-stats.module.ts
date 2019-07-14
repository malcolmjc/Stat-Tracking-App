import { CommonModule } from '@angular/common';
import { MatGridListModule, MatSelectModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { UserStatsComponent } from './user-stats.component';

@NgModule({
  declarations: [
    UserStatsComponent
  ],
  exports: [
    UserStatsComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatSelectModule,
    MatRadioModule
  ]
})
export class UserStatsModule { }
