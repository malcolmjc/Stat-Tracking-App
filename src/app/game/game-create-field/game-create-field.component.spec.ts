import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreateFieldComponent } from './game-create-field.component';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';

describe('GameCreateFieldComponent', () => {
  let component: GameCreateFieldComponent;
  let fixture: ComponentFixture<GameCreateFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatRadioModule
      ],
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
