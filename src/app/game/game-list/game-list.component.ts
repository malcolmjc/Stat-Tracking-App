import { Component, OnInit } from '@angular/core';
import { Game } from '../game.model';
import { GameService } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  private gameListener: Subscription;
  private isLoading = false;
  games: Game[] = [
    {
      date: "Sat May 25 2019 14:13",
      id: "blah",
      losers: ["Jake", "Naga"],
      playerGames: [{
        id: 'hello',
        catches: 3,
        sinkers: 0,
        drops: 1,
        points: 3,
        fifas: 0,
        playerName: 'Jake',
        won: false
      },
      {
        id: 'hello',
        catches: 5,
        sinkers: 0,
        drops: 2,
        points: 4,
        fifas: 0,
        playerName: 'Naga',
        won: false
      },
      {
        id: 'hello',
        catches: 3,
        sinkers: 0,
        drops: 1,
        points: 7,
        fifas: 0,
        playerName: 'Everett',
        won: true
      },
      {
        id: 'hello',
        catches: 3,
        sinkers: 0,
        drops: 1,
        points: 5,
        fifas: 0,
        playerName: 'Malcolm',
        won: true
      }],
      score: '12 - 7',
      winners: ['Everett', 'Dylan']
    }
  ];

  constructor(public gameService: GameService) { }

  ngOnInit() {
    //TODO: re-add this
    this.isLoading = true;
    this.gameService.getGames();
    this.gameListener = this.gameService.getGameUpdateListener()
      .subscribe((games: Game[]) => {
        console.log("getting a new game");
        this.isLoading = false;
        this.games = games;
    });
  }

  deleteGame(id: string) {
    this.gameService.deleteGame(id);
  }
}
