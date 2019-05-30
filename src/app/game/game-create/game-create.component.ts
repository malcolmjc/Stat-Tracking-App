import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GameService } from '../game.service';
import { PlayerGame } from '../player-game.model';

@Component({
  selector: 'app-game-create',
  templateUrl: './game-create.component.html',
  styleUrls: ['./game-create.component.css']
})
export class GameCreateComponent implements OnInit {
  private _index = 0;

  @Input()
  set index(index: number) {
    this._index = index;
  }

  numSinkers = 0;
  numFifas = 0;
  numPoints = 0;
  numDrops = 0;
  numCatches = 0;
  playerName = 'Dylan';
  isWin = false;
  @Output() pointsChanged = new EventEmitter<[number, number]>();

  onNegativeClicked(str: string) {
    switch (str) {
      case 'sinker': {
        this.numSinkers = (this.numSinkers >= 1) ? this.numSinkers - 1 : this.numSinkers;
        break;
      }

      case 'fifa': {
        this.numFifas = (this.numFifas >= 1) ? this.numFifas - 1 : this.numFifas;
        break;
      }

      case 'point': {
        this.numPoints = (this.numPoints >= 1) ? this.numPoints - 1 : this.numPoints;
        this.pointsChanged.emit([this.numPoints, this._index]);
        break;
      }

      case 'drop': {
        this.numDrops = (this.numDrops >= 1) ? this.numDrops - 1 : this.numDrops;
        break;
      }

      case 'catch': {
        this.numCatches = (this.numCatches >= 1) ? this.numCatches - 1 : this.numCatches;
        break;
      }
    }
  }

  onPositiveClicked(str: string) {
    switch (str) {
      case 'sinker': {
        this.numSinkers++;
        break;
      }

      case 'fifa': {
        this.numFifas++;
        break;
      }

      case 'point': {
        this.numPoints++;
        this.pointsChanged.emit([this.numPoints, this._index]);
        break;
      }

      case 'drop': {
        this.numDrops++;
        break;
      }

      case 'catch': {
        this.numCatches++;
        break;
      }
    }
  }

  onPlayerSelection(evt) {
    this.playerName = evt.value;
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

    this.gameService.saveSinglePlayerGame(this._index, playerGame);
  }

  onWinClicked() {
    this.isWin = true;
  }

  onLossClicked() {
    this.isWin = false;
  }

  constructor(public gameService: GameService) {}

  ngOnInit() {
  }

}
