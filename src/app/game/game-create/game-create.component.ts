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
  private listIndex = 0;

  @Input()
  set index(index: number) {
    this.listIndex = index;
  }
  @Input() playerName = '';
  @Output() statsChanged = new EventEmitter<[StatType, number, number, string]>();

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

  constructor(public gameService: GameService) {}

  onNegativeClicked(str: string) {
    switch (str) {
      case 'sinker': {
        const shouldLower = (this.numSinkers >= 1);
        if (shouldLower) {
          this.numSinkers--;
          this.statsChanged.emit([StatType.sinkers, -1, this.listIndex, this.playerName]);
        }
        break;
      }

      case 'fifa': {
        const shouldLower = (this.numFifas >= 1);
        if (shouldLower) {
          this.numFifas--;
          this.statsChanged.emit([StatType.fifas, -1, this.listIndex, this.playerName]);
        }
        break;
      }

      case 'point': {
        const shouldLower = (this.numPoints >= 1);
        if (shouldLower) {
          this.numPoints--;
          this.statsChanged.emit([StatType.points, -1, this.listIndex, this.playerName]);
        }
        break;
      }

      case 'drop': {
        const shouldLower = (this.numDrops >= 1);
        if (shouldLower) {
          this.numDrops--;
          this.statsChanged.emit([StatType.drops, -1, this.listIndex, this.playerName]);
        }
        break;
      }

      case 'catch': {
        const shouldLower = (this.numCatches >= 1);
        if (shouldLower) {
          this.numCatches--;
          this.statsChanged.emit([StatType.catches, -1, this.listIndex, this.playerName]);
        }
        break;
      }
    }
  }

  onPositiveClicked(str: string) {
    switch (str) {
      case 'sinker': {
        this.numSinkers++;
        this.statsChanged.emit([StatType.sinkers, 1, this.listIndex, this.playerName]);
        break;
      }

      case 'fifa': {
        this.numFifas++;
        this.statsChanged.emit([StatType.fifas, 1, this.listIndex, this.playerName]);
        break;
      }

      case 'point': {
        this.numPoints++;
        this.statsChanged.emit([StatType.points, 1, this.listIndex, this.playerName]);
        break;
      }

      case 'drop': {
        this.numDrops++;
        this.statsChanged.emit([StatType.drops, 1, this.listIndex, this.playerName]);
        break;
      }

      case 'catch': {
        this.numCatches++;
        this.statsChanged.emit([StatType.catches, 1, this.listIndex, this.playerName]);
        break;
      }
    }
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
