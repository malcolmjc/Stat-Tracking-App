import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Renderer2 } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { of, Observable } from 'rxjs';
import { MatButtonModule, MatDialogModule, MatDialog } from '@angular/material';

import { GameCreateListComponent } from './game-create-list.component';
import { GameService } from '../game.service';
import { MockGameCreateComponent } from '../game-create/game-create.component.mock';

describe('GameCreateListComponent', () => {
  let component: GameCreateListComponent;
  let fixture: ComponentFixture<GameCreateListComponent>;
  let gameService: SpyObject<GameService>;
  let dialog: SpyObject<MatDialog>;
  let router: SpyObject<Router>;
  let route: ActivatedRoute;
  let renderer: SpyObject<Renderer2>;

  beforeEach(async(() => {
    gameService = createSpyObject(['addGame']);
    dialog = createSpyObject(['open']);
    router = createSpyObject(['navigate']);
    route = {
      queryParams: of({
        player: ['player1', 'player2', 'player3', 'player4']
      }) as Observable<Params>
    } as ActivatedRoute;
    renderer = createSpyObject(['setStyle']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
      ],
      declarations: [
        GameCreateListComponent,
        MockGameCreateComponent
      ],
      providers: [
        { provide: GameService, useValue: gameService },
        { provide: MatDialog, useValue: dialog },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: route },
        { provide: Renderer2, useValue: renderer }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
