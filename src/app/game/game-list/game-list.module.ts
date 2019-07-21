import { CommonModule } from '@angular/common';
import { MatCardModule, MatExpansionModule, MatGridListModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { DateToStringPipe } from '../../pipes/date-to-string.pipe';
import { GameListComponent } from './game-list.component';
import { GameResultsModule } from '../game-results/game-results.module';

@NgModule({
  declarations: [
    GameListComponent,
    DateToStringPipe
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    GameResultsModule
  ],
  exports: [
    GameListComponent
  ]
})
export class GameListModule { }
