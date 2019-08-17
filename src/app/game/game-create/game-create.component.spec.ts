import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';

import { GameCreateComponent } from './game-create.component';
import { GameCreateFieldModule } from '../game-create-field/game-create-field.module';

describe('GameCreateComponent', () => {
  let component: GameCreateComponent;
  let fixture: ComponentFixture<GameCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        MatButtonModule,
        MatCardModule,
        MatRadioModule,
        // TODO - mock GameCreateFieldComponent
        GameCreateFieldModule
      ],
      declarations: [ GameCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
