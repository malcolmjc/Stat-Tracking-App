import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule, MatCardModule, MatExpansionModule, MatGridListModule } from '@angular/material';

import { DateToStringPipe } from 'src/app/pipes/date-to-string.pipe';
import { GameListComponent } from './game-list.component';
import { GameResultsModule } from '../game-results/game-results.module';
import { GameService } from '../game.service';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';
import { NoGamesModule } from '../no-games/no-games.module';
import { NoGamesComponent } from '../no-games/no-games.component';
import { LoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component';
import { GameResultsComponent } from '../game-results/game-results.component';

describe('GameListComponent', () => {
  let component: GameListComponent;
  let fixture: ComponentFixture<GameListComponent>;
  let gameService: SpyObject<GameService>;

  beforeEach(async(() => {
    gameService = createSpyObject(['getGames', 'getGameUpdateListener']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatGridListModule
      ],
      declarations: [
        // TODO - mock these components
        NoGamesComponent,
        LoadingIndicatorComponent,
        GameResultsComponent,
        GameListComponent,
        // TODO: Mock this
        DateToStringPipe
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
