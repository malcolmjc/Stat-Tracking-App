import { Component, OnInit, Inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { GameService } from '../game.service';
import { PlayerGame } from '../player-game.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Game } from '../game.model';
import { GameCreateComponent } from '../game-create/game-create.component';

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
  @ViewChildren(GameCreateComponent) children!: QueryList<GameCreateComponent>;
  constructor(public gameService: GameService, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
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

  onPointsChanged(data: [number, number]) {
    const score = data[0];
    const index = data[1];
    if (index === 0) {
      this.topScoreOne = score;
    } else if (index === 1) {
      this.topScoreTwo = score;
    } else if (index === 2) {
      this.bottomScoreOne = score;
    } else if (index === 3) {
      this.bottomScoreTwo = score;
    }
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
