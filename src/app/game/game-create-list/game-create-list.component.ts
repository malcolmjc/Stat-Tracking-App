import { ActivatedRoute, Router } from '@angular/router';
import { AfterViewInit, Component, DebugElement, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogContentCancelComponent } from './dialogs/dialog-cancel/dialog-content-cancel.component';
import { DialogContentDoneComponent } from './dialogs/dialog-done/dialog-content-done.component';
import { DialogContentFailureComponent } from './dialogs/dialog-failure/dialog-content-failure.component';
import { Game } from '../game.model';
import { GameCreateComponent } from '../game-create/game-create.component';
import { GameService } from '../game.service';
import { GameStats } from '../game-stats.model';

interface PlayerRating {
  name: string;
  rating: number;
}
@Component({
  selector: 'app-game-create-list',
  templateUrl: './game-create-list.component.html',
  styleUrls: ['./game-create-list.component.scss']
})
export class GameCreateListComponent implements OnInit, AfterViewInit {
  @ViewChild('finishButtons') public finishButtonsElement: DebugElement;
  @ViewChildren(GameCreateComponent) public children!: QueryList<GameCreateComponent>;

  public topScoreOne = 0;
  public topScoreTwo = 0;
  public bottomScoreOne = 0;
  public bottomScoreTwo = 0;
  public playerNames: string[] = [];
  public mvp: PlayerRating;
  public lvp: PlayerRating;
  public singlePlayerOnly = false;

  private playerRatings: PlayerRating[] = [];
  private mapNameToGameStats: Map<string, GameStats> = new Map();
  private defaultGameStats: GameStats = {
      catches: 0,
      sinkers: 0,
      drops: 0,
      points: 0,
      fifas: 0
  };

  constructor(public gameService: GameService,
              public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              private renderer: Renderer2) { }

  public ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.player) {
          if (typeof params.player === 'string') {
            this.singlePlayerOnly = true;
            this.playerNames = [params.player];
          } else {
            this.playerNames = params.player;
          }
          this.initMap();
          this.initPlayerRatings();
        } else {
          this.router.navigate(['select-players']);
        }
      });
  }

  public ngAfterViewInit() {
    // sets the buttons to fit appropriately based on number of players - coupled to flex% in css file
    this.renderer.setStyle(
      this.finishButtonsElement.nativeElement,
      'width',
      '' + ((this.playerNames.length * 24) + ((100 / this.playerNames.length - 24) * (this.playerNames.length - 1))) + '%');
  }

  public onDoneClicked() {
    const playerGames = [];
    this.children.forEach((child) => {
      playerGames.push(child.getPlayerData());
    });
    const wins: boolean[] = playerGames.map((game) => game.won);
    if (playerGames.length === 4 && !(wins.filter((w) => w).length === 2)) {
      this.openFailureDialog('More than 2 players won or lost a game!');
    } else {
      this.openSuccessDialog(playerGames);
    }
  }

  public onCancelClicked() {
    const dialogRef = this.dialog.open(DialogContentCancelComponent);

    if (dialogRef) {
      dialogRef.afterClosed().subscribe((result) => {
        // user approved the cancel of this game
        if (result) {
          this.router.navigate(['']);
        }
      });
    }
  }

  public onStatsChanged(playerName: string) {
    const mapEntry = this.mapNameToGameStats.get(playerName);
    if (!mapEntry) {
      return;
    }

    const changedChild = this.children.find((child) => child.playerName === playerName);
    mapEntry.points = changedChild.numPoints;
    mapEntry.drops = changedChild.numDrops;
    mapEntry.catches = changedChild.numCatches;
    mapEntry.fifas = changedChild.numFifas;
    mapEntry.sinkers = changedChild.numSinkers;

    this.updateGameScore(changedChild);

    const playerRating = this.playerRatings.find((rating) => rating.name === playerName);
    playerRating.rating = this.calculatePlayerRating(mapEntry);

    this.setMvpAndLvp();
    this.updateStatLeaders();
  }

  private initMap() {
    this.playerNames.forEach((name) => {
      this.mapNameToGameStats.set(name, this.defaultGameStats);
    });
  }

  private initPlayerRatings() {
    this.playerNames.forEach((name) => {
      this.playerRatings.push({ name: name, rating: 0.0 });
    });
  }

  private setMvpAndLvp() {
    this.mvp = this.playerRatings.reduce((a, b) => {
      return (a.rating > b.rating) ? a : b;
    });
    this.lvp = this.playerRatings.reduce((a, b) => {
      return (a.rating < b.rating) ? a : b;
    });
  }

  private updateGameScore(changedChild: GameCreateComponent) {
    if (changedChild.getIndex() === 0) {
      this.topScoreOne = changedChild.numPoints;
    } else if (changedChild.getIndex() === 1) {
      this.topScoreTwo = changedChild.numPoints;
    } else if (changedChild.getIndex() === 2) {
      this.bottomScoreOne = changedChild.numPoints;
    } else if (changedChild.getIndex() === 3) {
      this.bottomScoreTwo = changedChild.numPoints;
    }
  }

  private calculatePlayerRating(gameStats: GameStats) {
    let rating = 0;
    rating += gameStats.points * 1.0;
    rating += gameStats.catches * 0.7;
    rating -= gameStats.drops * 0.7;
    rating += gameStats.fifas * 0.5;
    rating += gameStats.sinkers * 1.5;
    return rating;
  }

  private updateStatLeaders() {
    let maxCatches = 0;
    let maxPoints = 0;
    this.children.forEach((child) => {
      if (child.playerName === this.mvp.name) {
        child.mvp = true;
      } else {
        child.mvp = false;
      }
      if (this.lvp && child.playerName === this.lvp.name) {
        child.lvp = true;
      } else {
        child.lvp = false;
      }
      if (child.numCatches >= maxCatches) {
        maxCatches = child.numCatches;
      }
      if (child.numPoints >= maxPoints) {
        maxPoints = child.numPoints;
      }
    });
    this.children.forEach((child) => {
      child.catchLeader = child.numCatches === maxCatches;
      child.pointLeader = child.numPoints === maxPoints;
    });
  }

  private openFailureDialog(failureReason: string) {
    const dialogRef = this.dialog.open(DialogContentFailureComponent, {
      data: failureReason
    });
  }

  private openSuccessDialog(playerGames) {
    const dialogRef = this.dialog.open(DialogContentDoneComponent);

    if (dialogRef) {
      dialogRef.afterClosed().subscribe(result => {
        // user did not approve the save of this game
        if (!result) {
          return;
        }

        const savedGame: Game = {
          id: null,
          date: new Date(),
          playerGames: playerGames
        };

        this.gameService.addGame(savedGame);
        this.router.navigate(['']);
      });
    }
  }
}
