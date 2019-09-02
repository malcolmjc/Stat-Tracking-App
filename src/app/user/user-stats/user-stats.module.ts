import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material';

import { ConvertNaNPipe } from 'src/app/pipes/convert-nan.pipe';
import { UserDisplayModule } from '../user-display/user-display.module';
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
    MatGridListModule,
    UserDisplayModule
  ]
})
export class UserStatsModule { }
