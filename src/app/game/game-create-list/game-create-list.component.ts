import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { MatDialog } from '@angular/material';

import { DialogContentCancelComponent } from './dialogs/dialog-cancel/dialog-content-cancel.component';
import { DialogContentDoneComponent } from './dialogs/dialog-done/dialog-content-done.component';
import { DialogContentFailureComponent } from './dialogs/dialog-failure/dialog-content-failure.component';
import { Game } from '../game.model';
import { GameCreateComponent } from '../game-create/game-create.component';
import { GameService } from '../game.service';
import { StatType } from '../stat-types-enum';
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
        } else {
          this.router.navigate(['select-players']);
        }
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

  onStatsChanged(data: [StatType, number, number, string]) {
    const stat: StatType = data[0];
    const amt = data[1];
    const index = data[2];
    const playerName: string = data[3];
    let playerRating = this.playerRatings.find((rating) => rating.name === playerName);
    if (!playerRating) {
      playerRating = { name: playerName, rating: 0 };
      this.playerRatings.push(playerRating);
    }
    switch (stat) {
      case StatType.points: {
        if (index === 0) {
          this.topScoreOne += amt;
        } else if (index === 1) {
          this.topScoreTwo += amt;
        } else if (index === 2) {
          this.bottomScoreOne += amt;
        } else if (index === 3) {
          this.bottomScoreTwo += amt;
        }
        playerRating.rating += amt * 1.0;
        break;
      }
      case StatType.catches: {
        playerRating.rating += amt * 0.7;
        break;
      }
      case StatType.drops: {
        playerRating.rating -= amt * 0.7;
        break;
      }
      case StatType.fifas: {
        playerRating.rating += amt * 0.5;
        break;
      }
      case StatType.sinkers: {
        playerRating.rating += amt * 1.5;
        break;
      }
    }

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
        id: 'will-be-replaced-by-db',
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
