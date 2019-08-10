import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { Game } from './game.model';

const API_URL = environment.apiUrl + 'games';

@Injectable({providedIn: 'root'})
export class GameService {
  private games: Game[] = [];
  private gamesUpdated = new Subject<Game[]>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  public getGames() {
    this.http.post<{message: string, games: any}>(API_URL + '/get', {
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
      this.http.post<{message: string, id: string}>(API_URL + '/addToUser', postData)
        .subscribe((responseData) => {
          console.log(responseData.message);
          game.id = responseData.id;
          this.games.push(game);
          this.gamesUpdated.next([...this.games]);
        });
    } else {
      this.http.post<{message: string, id: string}>(API_URL + '/addToGroup', postData)
        .subscribe((responseData) => {
          console.log(responseData.message);
          game.id = responseData.id;
          this.games.push(game);
          this.gamesUpdated.next([...this.games]);
        });
    }
  }

  // REMOVING GAME DELETION FOR NOW
  // public deleteGame(gameId: string) {
  //   this.http.delete(API_URL + this.authService.getUserId() + '/' + gameId)
  //     .subscribe(() => {
  //       console.log(gameId);
  //       const updatedGames = this.games.filter(game => {
  //         return game.id !== gameId;
  //       });
  //       this.games = updatedGames;
  //       this.gamesUpdated.next([...this.games]);
  //     });
  // }
}
