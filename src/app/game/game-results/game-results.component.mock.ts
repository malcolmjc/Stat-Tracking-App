import { Component, Input } from '@angular/core';

import { PlayerGame } from '../player-game.model';

@Component({
  selector: 'app-game-results',
  template: 'MOCK game-results',
})
export class MockGameResultsComponent {
  @Input() public playerGame: PlayerGame;
}
