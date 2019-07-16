import { MatGridListModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GameResultsComponent } from './game-results.component';

@NgModule({
  declarations: [
    GameResultsComponent
  ],
  imports: [
    MatGridListModule
  ],
  exports: [
    GameResultsComponent
  ]
})
export class GameResultsModule { }
