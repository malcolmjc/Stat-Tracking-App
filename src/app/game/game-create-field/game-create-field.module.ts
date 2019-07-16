import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GameCreateFieldComponent } from './game-create-field.component';

@NgModule({
  declarations: [
    GameCreateFieldComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatRadioModule
  ],
  exports: [
    GameCreateFieldComponent
  ]
})
export class GameCreateFieldModule { }
