import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateListComponent } from './game-create-list.component';

describe('GameCreateListComponent', () => {
  let component: GameCreateListComponent;
  let fixture: ComponentFixture<GameCreateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCreateListComponent ]
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
