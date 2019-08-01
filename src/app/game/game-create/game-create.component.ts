import { Component, EventEmitter, Input, Output } from '@angular/core';

import { GameService } from '../game.service';
import { PlayerGame } from '../player-game.model';
import { StatType } from '../stat-types-enum';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent {
  @Input()
  set index(index: number) {
    this.listIndex = index;
  }
  @Input() public playerName = '';
  @Input() public singlePlayer = false;
  @Output() public statsChanged = new EventEmitter<string>();

  public StatType = StatType;
  public mvp = false;
  public lvp = false;
  public catchLeader = false;
  public pointLeader = false;

  public numSinkers = 0;
  public numFifas = 0;
  public numPoints = 0;
  public numDrops = 0;
  public numCatches = 0;
  public isWin = false;

  private listIndex = 0;

  constructor(public gameService: GameService) {}

  public getIndex() {
    return this.listIndex;
  }

  public statChanged(stat: { statType: StatType, statCount: number }) {
    switch (stat.statType) {
      case StatType.points: {
        this.numPoints = stat.statCount;
        break;
      }
      case StatType.drops: {
        this.numDrops = stat.statCount;
        break;
      }
      case StatType.catches: {
        this.numCatches = stat.statCount;
        break;
      }
      case StatType.fifas: {
        this.numFifas = stat.statCount;
        break;
      }
      case StatType.sinkers: {
        this.numSinkers = stat.statCount;
        break;
      }
    }
    this.statsChanged.emit(this.playerName);
  }

  public getPlayerData() {
    return {
      catches: this.numCatches,
      sinkers: this.numSinkers,
      drops: this.numDrops,
      points: this.numPoints,
      fifas: this.numFifas,
      playerName: this.playerName,
      won: this.isWin
    };
  }

  public getPlayerGameStats(): PlayerGame {
    return {
      id: null,
      catches: this.numCatches,
      sinkers: this.numSinkers,
      drops: this.numDrops,
      points: this.numPoints,
      fifas: this.numFifas,
      playerName: this.playerName,
      won: this.isWin
    };
  }

  public onWinClicked() {
    this.isWin = true;
  }

  public onLossClicked() {
    this.isWin = false;
  }
}
