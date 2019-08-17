import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatGridListModule } from '@angular/material';

import { GameResultsComponent } from './game-results.component';

describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let fixture: ComponentFixture<GameResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatGridListModule
      ],
      declarations: [
        GameResultsComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameResultsComponent);
    component = fixture.componentInstance;
    component.playerGame = {
      id: null,
      playerName: 'player',
      won: false,
      catches: 0,
      sinkers: 1,
      drops: 2,
      points: 3,
      fifas: 4
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
