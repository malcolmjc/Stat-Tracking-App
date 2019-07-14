import { MatButtonModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GamePlayerSelectComponent } from './game-player-select.component';
import { PlayerSelectionFormFieldModule } from 'src/app/user/player-selection-form-field/player-selection-form-field.module';

@NgModule({
  declarations: [
    GamePlayerSelectComponent
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    PlayerSelectionFormFieldModule
  ],
  exports: [
    GamePlayerSelectComponent
  ]
})
export class GamePlayerSelectModule { }
