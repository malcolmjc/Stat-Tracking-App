import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GamePlayerSelectComponent } from './game-player-select.component';
import { PlayerSelectionFormFieldModule } from 'src/app/user/player-selection-form-field/player-selection-form-field.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GamePlayerSelectComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    PlayerSelectionFormFieldModule,
    MatRadioModule
  ],
  exports: [
    GamePlayerSelectComponent
  ]
})
export class GamePlayerSelectModule { }
