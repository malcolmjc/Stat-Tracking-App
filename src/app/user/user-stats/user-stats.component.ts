import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { GameService } from 'src/app/game/game.service';
import { Subscription } from 'rxjs';
import { Game } from 'src/app/game/game.model';
import { PlayerGame } from 'src/app/game/player-game.model';

@Component({
  selector: 'app-user-stats',
  templateUrl: './user-stats.component.html',
  styleUrls: ['./user-stats.component.css']
})

export class UserStatsComponent implements OnInit {
  ascending = true;
  gameListener: Subscription;
  currentSortMethod = 'wins';

  users: User[] = [{
    name: 'Malcolm',
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    gamesWon: 0,
    gamesLost: 0
  },
  {
    name: 'Naga',
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    gamesWon: 0,
    gamesLost: 0
  },
  {
    name: 'Everett',
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    gamesWon: 0,
    gamesLost: 0
  },
  {
    name: 'Jake',
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    gamesWon: 0,
    gamesLost: 0
  },
  {
    name: 'Robbie',
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    gamesWon: 0,
    gamesLost: 0
  },
  {
    name: 'Dylan',
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    gamesWon: 0,
    gamesLost: 0
  },
  ];
  displayedColumns: string[] = ['win', 'loss', 'point', 'catch', 'drop', 'fifa', 'sinker'];

  selectedSort = '';
  matchupPredict = false;

  map = new Map<string, {
    catches: number,
    sinkers: number,
    drops: number,
    points: number,
    fifas: number,
    opponents: string,
    won: boolean
  }[]>();

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.gameService.getGames();
    this.gameListener = this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        for (const game of games) {
          let twoPlayerGameWinners = {
            catches: 0,
            sinkers: 0,
            drops: 0,
            points: 0,
            fifas: 0,
            opponents: '',
            won: true
          };
          let twoPlayerGameLosers = {
            catches: 0,
            sinkers: 0,
            drops: 0,
            points: 0,
            fifas: 0,
            opponents: '',
            won: false
          };
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

            // update matchup stats
            if (game.winners.includes(playerGame.playerName)) {
              twoPlayerGameWinners.catches += playerGame.catches;
              twoPlayerGameWinners.sinkers += playerGame.sinkers;
              twoPlayerGameWinners.drops += playerGame.drops;
              twoPlayerGameWinners.fifas += playerGame.fifas;
              twoPlayerGameWinners.points += playerGame.points;
            } else {
              twoPlayerGameLosers.catches += playerGame.catches;
              twoPlayerGameLosers.sinkers += playerGame.sinkers;
              twoPlayerGameLosers.drops += playerGame.drops;
              twoPlayerGameLosers.fifas += playerGame.fifas;
              twoPlayerGameLosers.points += playerGame.points;
            }
          }

          const mapKeyWinners = this.getKey(game.winners[0].toLowerCase(),
            game.winners[1].toLowerCase());
          const mapKeyLosers = this.getKey(game.losers[0].toLowerCase(),
            game.losers[1].toLowerCase());
          console.log('map key: ' + mapKeyWinners);
          if (this.map.get(mapKeyWinners) === undefined) {
            console.log("adding new key");
            this.map.set(mapKeyWinners, []);
          }
          twoPlayerGameWinners.opponents = mapKeyLosers;
          this.map.get(mapKeyWinners).push(twoPlayerGameWinners);

          console.log('map key: ' + mapKeyLosers);
          if (this.map.get(mapKeyLosers) === undefined) {
            console.log("adding new key");
            this.map.set(mapKeyLosers, []);
          }
          twoPlayerGameLosers.opponents = mapKeyWinners;
          this.map.get(mapKeyLosers).push(twoPlayerGameLosers);
        }
    });
    this.onSelection({
      value: this.currentSortMethod
    });
  }

  getKey(nameOne: string, nameTwo: string): string {
    let firstAlpha = '';
    let secondAlpha = '';
    if (nameOne < nameTwo) {
      firstAlpha = nameOne;
      secondAlpha = nameTwo;
    } else {
      firstAlpha = nameTwo;
      secondAlpha = nameOne;
    }
    return firstAlpha + '-' + secondAlpha;
  }

  teamOne: string[] = ['dylan', 'dylan'];
  teamTwo: string[] = ['dylan', 'dylan'];
  onPlayerSelection(event, index) {
    if (index <= 1) {
      this.teamOne[index] = event.value.toLowerCase();
    } else {
      this.teamTwo[index - 2] = event.value.toLowerCase();
    }
  }

  firstTeamStats = {
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    wins: 0,
    losses: 0
  };
  secondTeamStats = {
    catches: 0,
    sinkers: 0,
    drops: 0,
    points: 0,
    fifas: 0,
    wins: 0,
    losses: 0
  };
  errorMessage = '';
  showCalculations = false;
  setCalculationError(message: string) {
    this.errorMessage = message;
    this.showCalculations = false;
  }
  calculate() {
    const firstTeamMapKey = this.getKey(this.teamOne[0], this.teamOne[1]);
    const secondTeamMapKey = this.getKey(this.teamTwo[0], this.teamTwo[1]);
    const firstTeamResults = this.map.get(firstTeamMapKey);
    if (firstTeamResults === undefined || firstTeamResults.length === 0) {
      this.setCalculationError(this.teamOne[0] + ' & ' +  this.teamOne[1] + ' have never played together!');
      return;
    }
    for (const playerGame of firstTeamResults) {
      // if this is the correct matchup, update stats
      if (playerGame.opponents === secondTeamMapKey) {
        this.firstTeamStats.catches += playerGame.catches;
        this.firstTeamStats.sinkers += playerGame.sinkers;
        this.firstTeamStats.drops += playerGame.drops;
        this.firstTeamStats.points += playerGame.points;
        this.firstTeamStats.fifas += playerGame.fifas;
        if (playerGame.won) {
          this.firstTeamStats.wins++;
        } else {
          this.firstTeamStats.losses++;
        }
      }
    }

    const secondTeamResults = this.map.get(secondTeamMapKey);
    if (secondTeamResults === undefined || secondTeamResults.length === 0) {
      this.setCalculationError(this.teamTwo[0] + ' & ' + this.teamTwo[1] + ' have never played together!');
      return;
    }

    if (this.firstTeamStats.losses === 0 && this.firstTeamStats.wins === 0) {
      this.setCalculationError(this.teamOne[0] + ' & ' + this.teamOne[1] + ' have never played ' +
                          this.teamTwo[0] + ' & ' + this.teamTwo[1]);
      return;
    }
    for (const playerGame of this.map.get(secondTeamMapKey)) {
      if (playerGame.opponents === firstTeamMapKey) {
        this.secondTeamStats.catches += playerGame.catches;
        this.secondTeamStats.sinkers += playerGame.sinkers;
        this.secondTeamStats.drops += playerGame.drops;
        this.secondTeamStats.points += playerGame.points;
        this.secondTeamStats.fifas += playerGame.fifas;
        if (playerGame.won) {
          this.secondTeamStats.wins++;
        } else {
          this.secondTeamStats.losses++;
        }
      }
    }
    this.showCalculations = true;
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
          return this.ascending ? b.catches - a.catches : a.catches - b.catches;
        });
        break;
      }
      case 'drops': {
        this.users = this.users.sort((a, b) => {
          return this.ascending ? b.drops - a.drops : a.drops - b.drops;
        });
        break;
      }
      case 'fifas': {
        this.users = this.users.sort((a, b) => {
          return this.ascending ? b.fifas - a.fifas : a.fifas - b.fifas;
        });
        break;
      }
      case 'sinkers': {
        this.users = this.users.sort((a, b) => {
          return this.ascending ? b.sinkers - a.sinkers : a.sinkers - b.sinkers;
        });
        break;
      }
    }
  }

}
