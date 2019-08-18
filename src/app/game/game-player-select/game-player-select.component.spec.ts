import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GamePlayerSelectComponent } from './game-player-select.component';
import { MockPlayerSelectionFormFieldComponent } from 'src/app/user/player-selection-form-field/player-selection-form-field.component.mock';
import { UserService } from 'src/app/user/user.service';
import { CommonModule } from '@angular/common';

describe('GamePlayerSelectComponent', () => {
  let component: GamePlayerSelectComponent;
  let fixture: ComponentFixture<GamePlayerSelectComponent>;
  let router: SpyObject<Router>;
  let userService: SpyObject<UserService>;
  let toastr: SpyObject<ToastrService>;

  beforeEach(async(() => {
    router = createSpyObject(['navigate']);
    userService = createSpyObject(['getUsers']);
    userService.getUsers.mockReturnValue(of([]));

    toastr = createSpyObject(['error']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,

        MatButtonModule,
        MatCardModule,
        MatRadioModule
      ],
      declarations: [
        GamePlayerSelectComponent,
        MockPlayerSelectionFormFieldComponent
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: UserService, useValue: userService },
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
