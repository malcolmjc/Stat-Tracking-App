import { CommonModule } from '@angular/common';
import { MatCardModule, MatExpansionModule, MatGridListModule, MatProgressSpinnerModule, MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GameListComponent } from './game-list.component';

@NgModule({
  declarations: [
    GameListComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
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
