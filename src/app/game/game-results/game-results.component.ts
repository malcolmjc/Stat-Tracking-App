import { Component, Input, OnInit } from '@angular/core';

import { PlayerGame } from '../player-game.model';

@Component({
  selector: 'app-game-results',
  templateUrl: './game-results.component.html',
  styleUrls: ['./game-results.component.scss']
})
export class GameResultsComponent implements OnInit {
  @Input() public playerGame: PlayerGame;
  public numCols = 5;

  public ngOnInit() {
    if (window.screen.width < 768) {
      this.numCols = 3;
    }
  }
}
