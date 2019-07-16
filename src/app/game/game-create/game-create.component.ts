import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() playerName = '';
  @Output() statsChanged = new EventEmitter<string>();

  public StatType = StatType;
  numSinkers = 0;
  numFifas = 0;
  numPoints = 0;
  numDrops = 0;
  numCatches = 0;
  isWin = false;
  mvp = false;
  lvp = false;
  catchLeader = false;
  pointLeader = false;
  private listIndex = 0;

  constructor(public gameService: GameService) {}

  getIndex() {
    return this.listIndex;
  }

  statChanged(stat: { statType: StatType, statCount: number }) {
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

  saveData() {
    const playerGame: PlayerGame = {
      id: null,
      catches: this.numCatches,
      sinkers: this.numSinkers,
      drops: this.numDrops,
      points: this.numPoints,
      fifas: this.numFifas,
      playerName: this.playerName,
      won: this.isWin
    };

    this.gameService.saveSinglePlayerGame(this.listIndex, playerGame);
  }

  onWinClicked() {
    this.isWin = true;
  }

  onLossClicked() {
    this.isWin = false;
  }
}
