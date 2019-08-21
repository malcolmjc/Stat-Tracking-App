import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule } from '@angular/material';
import { Subject } from 'rxjs';

import { DateToStringPipe } from 'src/app/pipes/date-to-string.pipe';
import { Game } from '../game.model';
import { GameDisplay } from '../game-display.model';
import { GameListComponent } from './game-list.component';
import { GameService } from '../game.service';
import { MockNoGamesComponent } from '../no-games/no-games.component.mock';
import { MockGameResultsComponent } from '../game-results/game-results.component.mock';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gameService: SpyObject<GameService>;
  const gamesUpdated = new Subject<Game[]>();

  beforeEach(async(() => {
    gameService = createSpyObject(['getGames', 'getGameUpdateListener']);
    gameService.getGameUpdateListener.mockReturnValue(gamesUpdated.asObservable());
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatGridListModule
      ],
      declarations: [
        MockNoGamesComponent,
        MockLoadingIndicatorComponent,
        MockGameResultsComponent,
        DateToStringPipe,

        GameListComponent
      ],
      providers: [
        { provide: GameService, useValue: gameService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit behavior', () => {
    test('should set to loading on startup', () => {
      expect(component.isLoading).toBeTruthy();
    });

    test('should handle empty game array', () => {
      gamesUpdated.next([]);
      fixture.detectChanges();
      expect(component.games.length).toEqual(0);
    });

    const playerGameOne = {
      id: null,
      playerName: 'fake name',
      won: false,
      catches: 0,
      sinkers: 1,
      points: 2,
      drops: 3,
      fifas: 4
    };

    const playerGameTwo = {
      id: null,
      playerName: 'fake name 2',
      won: false,
      catches: 1,
      sinkers: 2,
      points: 3,
      drops: 4,
      fifas: 5
    };

    const playerGameThree = {
      id: null,
      playerName: 'fake name 3',
      won: true,
      catches: 10,
      sinkers: 20,
      points: 30,
      drops: 40,
      fifas: 50
    };

    const playerGameFour = {
      id: null,
      playerName: 'fake name 4',
      won: true,
      catches: 2,
      sinkers: 3,
      points: 4,
      drops: 5,
      fifas: 6
    };

    test('should handle single player game array', () => {
      gamesUpdated.next([{
        id: null,
        date: new Date(),
        playerGames: [playerGameOne]
      }]);
      expect(component.games.length).toEqual(1);
      const gameResult = component.games[0] as Game;
      expect(gameResult.playerGames[0]).toEqual(playerGameOne);
    });

    test('should handle four player game array', () => {
      gamesUpdated.next([{
        id: null,
        date: new Date(),
        playerGames: [playerGameOne, playerGameTwo, playerGameThree, playerGameFour]
      }]);
      expect(component.games.length).toEqual(1);
      const gameResult = component.games[0] as GameDisplay;
      expect(gameResult.losingScore).toEqual(playerGameOne.points + playerGameTwo.points);
      expect(gameResult.winningScore).toEqual(playerGameThree.points + playerGameFour.points);

      expect(gameResult.losers.length).toEqual(2);
      expect(gameResult.losers.includes(playerGameOne.playerName)
             && gameResult.losers.includes(playerGameTwo.playerName)).toBeTruthy();
      expect(gameResult.winners.length).toEqual(2);
      expect(gameResult.winners.includes(playerGameThree.playerName)
             && gameResult.winners.includes(playerGameFour.playerName)).toBeTruthy();
    });
  });
});
