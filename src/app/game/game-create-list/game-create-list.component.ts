import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { GameService } from '../game.service';
import { PlayerGame } from '../player-game.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Game } from '../game.model';
import { GameCreateComponent } from '../game-create/game-create.component';
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
  failureReason = '';
  topScoreOne = 0;
  topScoreTwo = 0;
  bottomScoreOne = 0;
  bottomScoreTwo = 0;
  saveDataBool = false;
  playerRatings: PlayerRating[] = [];
  playerNames: string[] = [];
  @ViewChildren(GameCreateComponent) children!: QueryList<GameCreateComponent>;
  constructor(public gameService: GameService, public dialog: MatDialog,
     private router: Router, private route: ActivatedRoute, public userService: UserService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        if (params.player !== undefined && params.player.length === 4) {
          const availablePlayers = this.userService.getAllPlayers()
            .map((val) => { return val.name; });
          for (const playerName of params.player) {
            // ensure that the user has correct names for players
            if (!availablePlayers.includes(playerName)) {
              return;
            }
          }
          this.playerNames = params.player;
        }
      });
    if (this.playerNames.length === 0) {
      this.router.navigate(['select-players']);
    }
  }

  onDoneClicked() {
    this.children.forEach((child) => {
      child.saveData();
    });
    const currentGames: PlayerGame[] = this.gameService.getPlayerGames();
    let valid: boolean = currentGames.length === 4;
    if (!valid) {
      // wait for all game stats to be saved
      return;
    }
    const playerSet = new Set();
    let wins: boolean[] = [];
    for (let i = 0; i < currentGames.length; i++) {
      if (currentGames[i] === undefined) {
        valid = false;
        this.failureReason = 'Not all players stats are saved!';
        break;
      }
      if (playerSet.has(currentGames[i].playerName)) {
        valid = false;
        this.failureReason = 'You have duplicate stats for the same player!';
        break;
      }
      playerSet.add(currentGames[i].playerName);
      wins.push(currentGames[i].won);
    }

    //final validity check - make sure 2 players won and 2 lost
    if (valid) {
      valid = wins.filter((w) => w).length === 2;
      if (!valid) {
        this.failureReason = 'More than 2 players won or lost a game!';
      }
    }

    this.openDialog(valid);
  }

  onCancelClicked() {
    const dialogRef = this.dialog.open(DialogContentCancel);

    dialogRef.afterClosed().subscribe(result => {
      // user approved the cancel of this game
      if (result) {
        this.router.navigate(['']);
      }
    });
  }

  mvp: PlayerRating = null;
  lvp: PlayerRating = null;
  onStatsChanged(data: [StatType, number, number, string]) {
    const stat: StatType = data[0];
    const amt = data[1];
    const index = data[2];
    const playerName: string = data[3];
    let player = this.playerRatings.find((a) => a.name === playerName);
    if (player === undefined) {
      player = {name: playerName, rating: 0};
      this.playerRatings.push(player);
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
        player.rating += amt * 1.0;
        break;
      }

      case StatType.catches: {
        player.rating += amt * 0.7;
        break;
      }
      case StatType.drops: {
        player.rating -= amt * 0.7;
        break;
      }

      case StatType.fifas: {
        player.rating += amt * 0.5;
        break;
      }

      case StatType.sinkers: {
        player.rating += amt * 1.5;
        break;
      }
    }
    console.log(player.name);
    console.log("rating: " + player.rating);
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
    let maxCatchChild: GameCreateComponent;
    let maxPointChild: GameCreateComponent;
    let maxCatches = 0;
    let maxPoints = 0;
    this.children.forEach((child) => {
      if (child.playerName === this.mvp.name) {
        child.mvp = true;
      } else {
        child.mvp = false;
      }
      if (this.lvp !== null && child.playerName === this.lvp.name) {
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
    maxPointChild.pointLeader = true;
    maxCatchChild.catchLeader = true;
  }

  openDialog(valid: boolean): void {
    if (valid) {
      const dialogRef = this.dialog.open(DialogContentDone);

      dialogRef.afterClosed().subscribe(result => {
        // user approved the save of this game
        if (result) {
          const date = new Date();
          const playerGames = this.gameService.getPlayerGames();
          let winners: string[] = [];
          let losers: string[] = [];
          let losersPoints = 0;
          for (const results of playerGames) {
            if (results.won) {
              winners.push(results.playerName);
            } else {
              losers.push(results.playerName);
              losersPoints += results.points;
            }
          }

          const winner1 = playerGames.find((e) => {
            return e.playerName === winners[0];
          });

          const winner2 = playerGames.find((e) => {
            return e.playerName === winners[1];
          });

          const loser1 = playerGames.find((e) => {
            return e.playerName === losers[0];
          });

          const loser2 = playerGames.find((e) => {
            return e.playerName === losers[1];
          });

          const game: Game = {
            id: 'blah',
            date: date.toDateString() + ' ' +  date.getHours() + ':' + date.getMinutes(),
            playerGames: [winner1, winner2, loser1, loser2],
            winners: [winners[0], winners[1]],
            losers: [losers[0], losers[1]],
            score: '12 - ' + losersPoints
          };

          this.gameService.addGame(game);
          this.router.navigate(['']);
        }
      });
    } else {
      const dialogRef = this.dialog.open(DialogContentFailure, {
        data: this.failureReason
      });

      dialogRef.afterClosed().subscribe(result => {
        // user clicked 'OK'
      });
    }
  }
}

@Component({
  selector: 'app-dialog-content-done',
  templateUrl: 'dialogs/dialog-content-done.html',
})
export class DialogContentDone {
}

@Component({
  selector: 'app-dialog-content-failure',
  templateUrl: 'dialogs/dialog-content-failure.html',
})
export class DialogContentFailure {
  constructor(
    public dialogRef: MatDialogRef<DialogContentFailure>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
}

@Component({
  selector: 'app-dialog-content-cancel',
  templateUrl: 'dialogs/dialog-content-cancel.html',
})
export class DialogContentCancel {}

