import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GameCreateComponent } from './game-create.component';
import { GameCreateFieldModule } from '../game-create-field/game-create-field.module';

@NgModule({
  declarations: [
    GameCreateComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule,
    GameCreateFieldModule
  ],
  exports: [
    GameCreateComponent
  ]
})
export class GameCreateModule { }
