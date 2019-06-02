import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { User } from '../user.model';
import { GameService } from 'src/app/game/game.service';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/game/game.model';
import { PlayerGame } from 'src/app/game/player-game.model';
import { UserService } from '../user.service';
import { PlayerSelectionFormFieldComponent } from '../player-selection-form-field/player-selection-form-field.component';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})

export class UserStatsComponent implements OnInit {
  ascending = true;
  gameListener: Subscription;
  currentSortMethod = 'wins';
  displayedColumns: string[] = ['win', 'loss', 'point', 'catch', 'drop', 'fifa', 'sinker'];

  selectedSort = '';
  matchupPredict = false;

  users: User[];

  constructor(public gameService: GameService, public userService: UserService) { }

  ngOnInit() {
    this.users = this.userService.getAllPlayers();
    this.gameService.getGames();
    this.gameListener = this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        for (const game of games) {
          for (const playerGame of game.playerGames) {
            // update user stats
            const user = this.users.find(e => {
              return e.name === playerGame.playerName;
            });

            user.catches += playerGame.catches;
            user.sinkers += playerGame.sinkers;
            user.drops += playerGame.drops;
            user.fifas += playerGame.fifas;
            user.points += playerGame.points;

            if (playerGame.won) {
              user.gamesWon++;
            } else {
              user.gamesLost++;
            }
          }
        }
    });
    this.onSelection({
      value: this.currentSortMethod
    });
  }

  setDescending() {
    this.ascending = false;
    this.onSelection({
      value: this.currentSortMethod
    });
  }

  setAscending() {
    this.ascending = true;
    this.onSelection({
      value: this.currentSortMethod
    });
  }

  onSelection(evt) {
    this.currentSortMethod = evt.value;
    switch (evt.value) {
      case 'wins': {
        this.users = this.users.sort((a, b) => {
          return this.ascending ? b.gamesWon - a.gamesWon : a.gamesWon - b.gamesWon;
        });
        break;
      }
      case 'losses': {
        this.users = this.users.sort((a, b) => {
          return this.ascending ? b.gamesLost - a.gamesLost : a.gamesLost - b.gamesLost;
        });
        break;
      }
      case 'W/L': {
        this.users = this.users.sort((a, b) => {
          const aWL = a.gamesWon / (a.gamesWon + a.gamesLost);
          const bWL = b.gamesWon / (b.gamesLost + b.gamesWon);
          return this.ascending ? bWL - aWL : aWL - bWL;
        });
        break;
      }
      case 'catches': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.catches / (a.gamesLost + a.gamesWon);
          const bRes = b.catches / (b.gamesLost + b.gamesWon);
          return this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'points': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.points / (a.gamesLost + a.gamesWon);
          const bRes = b.points / (b.gamesLost + b.gamesWon);
          return this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'drops': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.drops / (a.gamesLost + a.gamesWon);
          const bRes = b.drops / (b.gamesLost + b.gamesWon);
          return this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'fifas': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.fifas / (a.gamesLost + a.gamesWon);
          const bRes = b.fifas / (b.gamesLost + b.gamesWon);
          return this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
      case 'sinkers': {
        this.users = this.users.sort((a, b) => {
          const aRes = a.sinkers / (a.gamesLost + a.gamesWon);
          const bRes = b.sinkers / (b.gamesLost + b.gamesWon);
          return this.ascending ? bRes - aRes : aRes - bRes;
        });
        break;
      }
    }
  }
}
