import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Game } from '../game.model';
import { GameService } from '../game.service';
import { GameDisplay } from '../game-display.model';
import { PlayerGame } from '../player-game.model';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit, OnDestroy {
  public gameListener: Subscription;
  public isLoading = false;
  public games: GameDisplay[] = [];
  public winningScore = 0;
  public losingScore = 0;

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.isLoading = true;
    this.gameService.getGames();
    this.gameListener = this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        const displayGames: GameDisplay[] = [];
        games.forEach((game) => {
          let winningScore = 0;
          let losingScore = 0;
          const winners: string[] = [];
          const losers: string[] = [];
          const winnerGames: PlayerGame[] = [];
          const loserGames: PlayerGame[] = [];
          game.playerGames.forEach((playerGame) => {
            playerGame.won ? winningScore += playerGame.points : losingScore += playerGame.points;
            if (playerGame.won) {
              winnerGames.push(playerGame);
              winners.push(playerGame.playerName);
            } else {
              loserGames.push(playerGame);
              losers.push(playerGame.playerName);
            }
          });
          displayGames.push({
            ...game,
            winningScore: winningScore,
            losingScore: losingScore,
            winners: winners,
            losers: losers,
            winnerGames: winnerGames,
            loserGames: loserGames
          });
        });
        this.isLoading = false;
        this.games = displayGames.reverse();
    });
  }

  ngOnDestroy() {
    this.gameListener.unsubscribe();
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id);
  }
}
