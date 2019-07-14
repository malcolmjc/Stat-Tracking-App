import { CommonModule } from '@angular/common';
import { MatCardModule, MatExpansionModule, MatGridListModule, MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GameListComponent } from './game-list.component';

@NgModule({
  declarations: [
    GameListComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    GameListComponent
  ]
})
export class GameListModule { }
