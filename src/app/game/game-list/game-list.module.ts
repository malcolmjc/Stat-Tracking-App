import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { DateToStringPipe } from '../../pipes/date-to-string.pipe';
import { GameListComponent } from './game-list.component';
import { GameResultsModule } from '../game-results/game-results.module';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';
import { NoGamesModule } from '../no-games/no-games.module';

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
    NoGamesModule,
    LoadingIndicatorModule,
    GameResultsModule
  ],
  exports: [
    GameListComponent
  ]
})
export class GameListModule { }
