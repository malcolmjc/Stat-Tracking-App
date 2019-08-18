import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule } from '@angular/material';
import { of } from 'rxjs';

import { DateToStringPipe } from 'src/app/pipes/date-to-string.pipe';
import { GameListComponent } from './game-list.component';
import { GameService } from '../game.service';
import { MockNoGamesComponent } from '../no-games/no-games.component.mock';
import { MockGameResultsComponent } from '../game-results/game-results.component.mock';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gameService: SpyObject<GameService>;

  beforeEach(async(() => {
    gameService = createSpyObject(['getGames', 'getGameUpdateListener']);
    gameService.getGameUpdateListener.mockReturnValue(of([]));
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
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
});
