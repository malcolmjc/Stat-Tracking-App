import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayerSelectComponent } from './game-player-select.component';

describe('GamePlayerSelectComponent', () => {
  let component: GamePlayerSelectComponent;
  let fixture: ComponentFixture<GamePlayerSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayerSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
