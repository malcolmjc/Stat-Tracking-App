import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { GamePlayerSelectComponent } from './game-player-select.component';
import { PlayerSelectionFormFieldComponent } from 'src/app/user/player-selection-form-field/player-selection-form-field.component';
import { UserService } from 'src/app/user/user.service';

describe('GamePlayerSelectComponent', () => {
  let component: GamePlayerSelectComponent;
  let fixture: ComponentFixture<GamePlayerSelectComponent>;
  let router: SpyObject<Router>;
  let userService: SpyObject<UserService>;
  let toastr: SpyObject<ToastrService>;

  beforeEach(async(() => {
    router = createSpyObject(['navigate']);
    userService = createSpyObject(['getUsers']);
    toastr = createSpyObject(['error']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatCardModule,
        MatRadioModule
      ],
      declarations: [
        GamePlayerSelectComponent,
        // TODO - mock this component
        PlayerSelectionFormFieldComponent
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: userService, useValue: userService },
        { provide: ToastrService, useValue: toastr }
      ]
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
