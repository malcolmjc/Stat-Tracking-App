import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GameCreateComponent } from './game-create.component';

@NgModule({
  declarations: [
    GameCreateComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  exports: [
    GameCreateComponent
  ]
})
export class GameCreateModule { }
