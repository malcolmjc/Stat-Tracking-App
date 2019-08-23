import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatButtonModule, MatCardModule, MatRadioModule } from '@angular/material';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GamePlayerSelectComponent } from './game-player-select.component';
import { MockPlayerSelectionFormFieldComponent } from 'src/app/user/player-selection-form-field/player-selection-form-field.component.mock';
import { UserService } from 'src/app/user/user.service';

describe('GamePlayerSelectComponent', () => {
  let component: GamePlayerSelectComponent;
  let fixture: ComponentFixture<GamePlayerSelectComponent>;
  let router: SpyObject<Router>;
  let userService: SpyObject<UserService>;
  let toastr: SpyObject<ToastrService>;
  let user$ = new Subject<string[]>();

  beforeEach(async(() => {
    router = createSpyObject(['navigate']);
    userService = createSpyObject(['getUsers']);
    userService.getUsers.mockReturnValue(user$.asObservable());

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

  describe('ngOnInit behavior', () => {
    test('should get player names', () => {
      const usernames = ['user1', 'user2', 'user3'];
      user$.next(usernames);
      expect(component.playerNames.length).toEqual(3);
      expect(component.playerNames).toEqual(usernames);
    });

    test('handles HttpErrorResponse Status 401', () => {
      jest.spyOn(component.toastr, 'error');
      user$.error(new HttpErrorResponse({ status: 401}));
      expect(component.playerNames.length).toEqual(0);
      expect(component.toastr.error).toHaveBeenCalledTimes(1);
    });

    test('handles HttpErrorResponse Status 500', () => {
      jest.spyOn(component.toastr, 'error');
      user$.error(new HttpErrorResponse({ status: 500}));
      expect(component.playerNames.length).toEqual(0);
      expect(component.toastr.error).toHaveBeenCalledTimes(1);
    });

    test('onCancelClicked button works', () => {
      jest.spyOn(component.router, 'navigate');
      jest.spyOn(component, 'onCancelClicked');
      const cancelButton = fixture.debugElement.query(By.css('button')).nativeElement;
      cancelButton.click();
      expect(component.onCancelClicked).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalledWith(['']);
    });

    describe('onDoneClicked behavior', () => {
      test('onDoneClicked button works', () => {
        jest.spyOn(component, 'onDoneClicked');
        const doneButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
        doneButton.click();
        expect(component.onDoneClicked).toHaveBeenCalled();
      });

      test('navigates to create with usernames', () => {
        jest.spyOn(component.router, 'navigate');
        const doneButton = fixture.debugElement.queryAll(By.css('button'))[1].nativeElement;
        doneButton.click();
        expect(component.router.navigate).toHaveBeenCalledWith(['create'],  { queryParams: { player: [] } });
      });
    });
  });
});
