import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, ViewChild } from '@angular/core';

import { MatGridListModule } from '@angular/material';

import { GameResultsComponent } from './game-results.component';
import { PlayerGame } from '../player-game.model';

@Component({
  template:
    `<app-game-results
      [playerGame]="playerGame">
    </app-game-results>`
})
class TestComponent {
  @ViewChild(GameResultsComponent) public component: GameResultsComponent;
  public playerGame: PlayerGame = {
    id: null,
    playerName: 'fakePlayer',
    won: true,
    catches: 0,
    sinkers: 1,
    drops: 2,
    points: 3,
    fifas: 4
  };
}
describe('GameResultsComponent', () => {
  let component: GameResultsComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatGridListModule
      ],
      declarations: [
        GameResultsComponent,
        TestComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    component = testComponent.component;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should get playerData', () => {
    const nameHeader = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(nameHeader.textContent).toEqual(testComponent.playerGame.playerName);
  });
});
