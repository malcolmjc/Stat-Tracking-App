import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Game } from './game.model';
import { PlayerGame } from './player-game.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class GameService {
  private games: Game[] = [];
  private gamesUpdated = new Subject<Game[]>();

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getGames() {
    this.http.post<{message: string, games: any}>('http://localhost:3001/api/games/get', {
      userId: this.authService.getUserId(),
      groupId: this.authService.getCurrentGroup()
    })
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

  public getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }

  public addGame(game: Game) {
    const postData = {
      ...game,
      groupId: this.authService.getCurrentGroup(),
      userId: this.authService.getUserId()
    };
    if (!postData.groupId) {
      this.http.post<{message: string, id: string}>('http://localhost:3001/api/games/addToUser', postData)
        .subscribe((responseData) => {
          console.log(responseData.message);
          game.id = responseData.id;
          this.games.push(game);
          this.gamesUpdated.next([...this.games]);
        });
    } else {
      this.http.post<{message: string, id: string}>('http://localhost:3001/api/games/addToGroup', postData)
        .subscribe((responseData) => {
          console.log(responseData.message);
          game.id = responseData.id;
          this.games.push(game);
          this.gamesUpdated.next([...this.games]);
        });
    }
  }

  public deleteGame(gameId: string) {
    // TODO: fix this to work with groups
    this.http.delete('http://localhost:3001/api/games/' + this.authService.getUserId() + '/' + gameId)
      .subscribe(() => {
        console.log(gameId);
        const updatedGames = this.games.filter(game => {
          return game.id !== gameId;
        });
        this.games = updatedGames;
        this.gamesUpdated.next([...this.games]);
      });
  }
}
