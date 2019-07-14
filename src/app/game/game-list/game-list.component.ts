import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { Game } from '../game.model';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  public gameListener: Subscription;
  public isLoading = false;
  public games: Game[] = [];

  constructor(public gameService: GameService) { }

  ngOnInit() {
    this.isLoading = true;
    this.gameService.getGames();
    this.gameListener = this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        console.log('getting a new game');
        this.isLoading = false;
        this.games = games.reverse();
    });
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id);
  }
}
