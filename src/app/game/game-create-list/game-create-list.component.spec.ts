import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Renderer2 } from '@angular/core';

import { of, Observable } from 'rxjs';
import { MatButtonModule, MatDialogModule, MatDialog } from '@angular/material';

import { DialogContentCancelComponent } from './dialogs/dialog-cancel/dialog-content-cancel.component';
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
  const playerParam = ['player1', 'player2', 'player3', 'player4'];

  const configureTestingModule = (activatedRoute: ActivatedRoute) => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule
      ],
      declarations: [
        GameCreateListComponent,
        MockGameCreateComponent
      ],
      providers: [
        { provide: GameService, useValue: gameService },
        { provide: MatDialog, useValue: dialog },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Renderer2, useValue: renderer }
      ]
    })
    .compileComponents();
  };

  const getComponents = () => {
    fixture = TestBed.createComponent(GameCreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  beforeEach(async(() => {
    gameService = createSpyObject(['addGame']);
    dialog = createSpyObject(['open']);
    router = createSpyObject(['navigate']);
    route = {
      queryParams: of({
        player: playerParam
      }) as Observable<Params>
    } as ActivatedRoute;
    renderer = createSpyObject(['setStyle']);
    dialog = createSpyObject(['open']);
    configureTestingModule(route);
  }));

  beforeEach(() => {
    getComponents();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit behavior', () => {
    test('sets player names based on query params', () => {
      expect(component.playerNames.length).toEqual(4);
      expect(component.playerNames).toEqual(playerParam);
    });

    test('should navigate back to select-players if no players param', async(() => {
      const navigateSpy = spyOn(router, 'navigate');

      TestBed.resetTestingModule();
      const newRoute = {
        queryParams: of({
          fake: 'blah'
        }) as Observable<Params>
      } as ActivatedRoute;

      configureTestingModule(newRoute);
      getComponents();

      expect(navigateSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['select-players']);
    }));

    test('works with single player', () => {
      TestBed.resetTestingModule();
      const newRoute = {
        queryParams: of({
          player: 'playerName'
        }) as Observable<Params>
      } as ActivatedRoute;

      configureTestingModule(newRoute);
      getComponents();

      expect(component.singlePlayerOnly).toBeTruthy();
      expect(component.playerNames.length).toEqual(1);
      expect(component.playerNames).toEqual(['playerName']);
    });
  });

  describe('ngAfterViewInit behavior', () => {
    test('works with 4 players', () => {
      expect(component.finishButtonsElement.nativeElement.style.width).toEqual('99%');
    });

    test('works with 3 players', () => {
      TestBed.resetTestingModule();
      const newRoute = {
        queryParams: of({
          player: ['player1', 'player2', 'player3']
        }) as Observable<Params>
      } as ActivatedRoute;
      configureTestingModule(newRoute);
      getComponents();

      expect(component.finishButtonsElement.nativeElement.style.width).toEqual('90.66666666666667%');
    });

    test('works with 2 players', () => {
      TestBed.resetTestingModule();
      const newRoute = {
        queryParams: of({
          player: ['player1', 'player2']
        }) as Observable<Params>
      } as ActivatedRoute;
      configureTestingModule(newRoute);
      getComponents();

      expect(component.finishButtonsElement.nativeElement.style.width).toEqual('74%');
    });

    test('works with 1 players', () => {
      TestBed.resetTestingModule();
      const newRoute = {
        queryParams: of({
          player: 'player1'
        }) as Observable<Params>
      } as ActivatedRoute;
      configureTestingModule(newRoute);
      getComponents();

      expect(component.finishButtonsElement.nativeElement.style.width).toEqual('24%');
    });
  });

  describe('onDoneClicked behavior', () => {
    test('opens dialog', () => {
      const doneButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
      const dialogOpenSpy = spyOn(component.dialog, 'open');
      expect(component.playerNames.length).toEqual(4);
      doneButton.click();
      expect(dialogOpenSpy).toHaveBeenCalled();
    });
  });

  describe('onCancelClicked behavior', () => {
    test('opens cancel dialog', () => {
      const cancelButton = fixture.debugElement.queryAll(By.css('button'))[0].nativeElement;
      const dialogOpenSpy = spyOn(component.dialog, 'open');
      expect(component.playerNames.length).toEqual(4);
      cancelButton.click();
      expect(dialogOpenSpy).toHaveBeenCalledWith(DialogContentCancelComponent);
    });
  });

  describe('onStatsChanged behavior', () => {
    // TODO - find a way to test this despite needing ViewChildren
  });
});
