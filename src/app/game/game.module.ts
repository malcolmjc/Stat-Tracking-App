import { NgModule } from '@angular/core';

import { GameCreateListModule } from './game-create-list/game-create-list.module';
import { GameCreateModule } from './game-create/game-create-module';
import { GameListModule } from './game-list/game-list.module';
import { GamePlayerSelectModule } from './game-player-select/game-player-select.module';

@NgModule({
  exports: [
    GameCreateModule,
    GameCreateListModule,
    GameListModule,
    GamePlayerSelectModule
  ]
})
export class GameModule { }
