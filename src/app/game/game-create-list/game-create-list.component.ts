import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogContentCancelComponent } from './dialogs/dialog-cancel/dialog-content-cancel.component';
import { DialogContentDoneComponent } from './dialogs/dialog-done/dialog-content-done.component';
import { DialogContentFailureComponent } from './dialogs/dialog-failure/dialog-content-failure.component';
import { Game } from '../game.model';
import { GameCreateComponent } from '../game-create/game-create.component';
import { GameService } from '../game.service';
import { GameStats } from '../game-stats.model';
import { UserService } from 'src/app/user/user.service';

interface PlayerRating {
  name: string;
  rating: number;
}
@Component({
  selector: 'app-game-create-list',
  templateUrl: './game-create-list.component.html',
  styleUrls: ['./game-create-list.component.css']
})
export class GameCreateListComponent implements OnInit {
  topScoreOne = 0;
  topScoreTwo = 0;
  bottomScoreOne = 0;
  bottomScoreTwo = 0;
  saveDataBool = false;
  mapNameToGameStats: Map<string, GameStats> = new Map();
  playerRatings: PlayerRating[] = [];
  playerNames: string[] = [];
  mvp: PlayerRating;
  lvp: PlayerRating;
  @ViewChildren(GameCreateComponent) children!: QueryList<GameCreateComponent>;
  constructor(public gameService: GameService, public dialog: MatDialog, private router: Router,
              private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.player && params.player.length === 4) {
          const availablePlayers = this.userService.getAllPlayers()
            .map((val) => val.name);

          params.player.forEach((playerName: string) => {
            if (!availablePlayers.includes(playerName)) {
              this.router.navigate(['select-players']);
            }
          });

          this.playerNames = params.player;
          this.initMap();
        } else {
          this.router.navigate(['select-players']);
        }
      });
  }

  initMap() {
    this.playerNames.forEach((name) => {
      this.mapNameToGameStats.set(name, {
        catches: 0,
        sinkers: 0,
        drops: 0,
        points: 0,
        fifas: 0
      });
    });
  }

  onDoneClicked() {
    this.children.forEach((child) => {
      child.saveData();
    });

    const wins: boolean[] = this.gameService.getPlayerGames().map((game) => game.won);
    if (!(wins.filter((w) => w).length === 2)) {
      this.openFailureDialog('More than 2 players won or lost a game!');
    } else {
      this.openSuccessDialog();
    }
  }

  onCancelClicked() {
    const dialogRef = this.dialog.open(DialogContentCancelComponent);

    dialogRef.afterClosed().subscribe(result => {
      // user approved the cancel of this game
      if (result) {
        this.router.navigate(['']);
      }
    });
  }

  onStatsChanged(playerName: string) {
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

    if (changedChild.getIndex() === 0) {
      this.topScoreOne = changedChild.numPoints;
    } else if (changedChild.getIndex() === 1) {
      this.topScoreTwo = changedChild.numPoints;
    } else if (changedChild.getIndex() === 2) {
      this.bottomScoreOne = changedChild.numPoints;
    } else if (changedChild.getIndex() === 3) {
      this.bottomScoreTwo = changedChild.numPoints;
    }

    let playerRating = this.playerRatings.find((rating) => rating.name === playerName);
    if (!playerRating) {
      playerRating = { name: playerName, rating: 0 };
      this.playerRatings.push(playerRating);
    }
    playerRating.rating = this.calculatePlayerRating(mapEntry);

    this.mvp = this.playerRatings.reduce((a, b) => {
      return (a.rating > b.rating) ? a : b;
    });
    if (this.playerRatings.length > 1) {
      this.lvp = this.playerRatings.reduce((a, b) => {
        return (a.rating < b.rating) ? a : b;
      });
    }

    this.updateStatLeaders();
  }

  calculatePlayerRating(gameStats: GameStats) {
    let rating = 0;
    rating += gameStats.points * 1.0;
    rating += gameStats.catches * 0.7;
    rating -= gameStats.drops * 0.7;
    rating += gameStats.fifas * 0.5;
    rating += gameStats.sinkers * 1.5;
    return rating;
  }

  updateStatLeaders() {
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

  openFailureDialog(failureReason: string) {
    const dialogRef = this.dialog.open(DialogContentFailureComponent, {
      data: failureReason
    });
  }

  openSuccessDialog() {
    const dialogRef = this.dialog.open(DialogContentDoneComponent);

    dialogRef.afterClosed().subscribe(result => {
      // user did not approve the save of this game
      if (!result) {
        return;
      }
      const date = new Date();
      const playerGames = this.gameService.getPlayerGames();
      const winners: string[] = [];
      const losers: string[] = [];
      let losersPoints = 0;
      for (const results of playerGames) {
        if (results.won) {
          winners.push(results.playerName);
        } else {
          losers.push(results.playerName);
          losersPoints += results.points;
        }
      }

      const winner1 = playerGames.find((game) => {
        return game.playerName === winners[0];
      });

      const winner2 = playerGames.find((game) => {
        return game.playerName === winners[1];
      });

      const loser1 = playerGames.find((game) => {
        return game.playerName === losers[0];
      });

      const loser2 = playerGames.find((game) => {
        return game.playerName === losers[1];
      });

      const savedGame: Game = {
        id: null,
        date: date.toDateString() + ' ' +  date.getHours() + ':' + date.getMinutes(),
        playerGames: [winner1, winner2, loser1, loser2],
        winners: [winners[0], winners[1]],
        losers: [losers[0], losers[1]],
        score: '12 - ' + losersPoints
      };

      this.gameService.addGame(savedGame);
      this.router.navigate(['']);
    });
  }
}
