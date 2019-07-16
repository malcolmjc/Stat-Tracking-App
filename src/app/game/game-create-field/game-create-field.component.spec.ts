import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateFieldComponent } from './game-create-field.component';

describe('GameCreateFieldComponent', () => {
  let component: GameCreateFieldComponent;
  let fixture: ComponentFixture<GameCreateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCreateFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreateFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
