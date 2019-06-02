import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PlayerGame } from './player-game.model';

@Injectable({providedIn: "root"})
export class GameService {
  private games: Game[] = [];
  private playerGames: PlayerGame[] = [];
  private gamesUpdated = new Subject<Game[]>();

  constructor(private http: HttpClient) {
  }

  getGames() {
    this.http.get<{message: string, games: any}>('http://localhost:3001/api/games')
    .pipe(map((gameData) => {
      return gameData.games.map(game => {
        return {
          id: game._id,
          date: game.date,
          playerGames: game.playerGames,
          winners: game.winners,
          losers: game.losers,
          score: game.score
        };
      });
    }))
    .subscribe(mappedGames => {
      this.games = mappedGames;
      this.gamesUpdated.next([...this.games]);
    });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  addGame(game: Game) {
    this.http.post<{message: string, id: string}>('http://localhost:3001/api/games', game)
    .subscribe((responseData) => {
      console.log(responseData.message);
      game.id = responseData.id;
      this.games.push(game);
      this.gamesUpdated.next([...this.games]);
    });
  }

  deleteGame(id: string) {
    this.http.delete('http://localhost:3001/api/games/' + id)
      .subscribe(() => {
        console.log(id);
        const updatedGames = this.games.filter(game => {
          return game.id !== id;
        });
        this.games = updatedGames;
        this.gamesUpdated.next([...this.games]);
      });
  }
  
  saveSinglePlayerGame(index: number, playerGame: PlayerGame) {
    this.playerGames[index] = playerGame;
  }

  //this should only be called after all playerGames logged
  getPlayerGames() {
    return [...this.playerGames];
  }
}
