import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { Subject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GroupService } from '../groups/group.service';
import { HeaderComponent } from './header.component';
import { MockFontAwesomeModule } from '../font-awesome.mock.module';
import { Notification } from '../notifications/notification.model';
import { UserService } from '../user/user.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: SpyObject<AuthService>;
  let groupService: SpyObject<GroupService>;
  let userService: SpyObject<UserService>;
  const groupName$ = new Subject<string>();
  const authStatus$ = new Subject<boolean>();
  const notifications$ = new Subject<Notification[]>();
  const username = 'username';
  const isAuthenticated = true;

  beforeEach(async(() => {
    authService = createSpyObject([
      'getUserName',
      'getIsAuthenticated',
      'getAuthStatusListener',
      'logout'
    ]);
    authService.getUserName.mockReturnValue(username);
    authService.getIsAuthenticated.mockReturnValue(isAuthenticated);
    authService.getAuthStatusListener.mockReturnValue(authStatus$.asObservable());

    groupService = createSpyObject([
      'getCurrentGroupName',
      'getCurrentGroupListener'
    ]);
    groupService.getCurrentGroupListener.mockReturnValue(groupName$.asObservable());

    userService = createSpyObject(['getNotificationsForUser']);
    userService.getNotificationsForUser.mockReturnValue(notifications$.asObservable());

    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        MockFontAwesomeModule,
        MatButtonModule,
        MatToolbarModule,
      ],
      declarations: [ HeaderComponent ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: GroupService, useValue: groupService },
        { provide: UserService, useValue: userService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('logging out actually logs you out', () => {
    jest.spyOn(authService, 'logout');
    component.onLogout();
    expect(authService.logout).toHaveBeenCalled();
  });

  describe('ngOnInit behavior', () => {
    test('sets authStatus correctly', () => {
      expect(component.userIsAuthenticated).toEqual(isAuthenticated);
    });

    test('sets username correctly', () => {
      expect(component.username).toEqual(username);
    });

    test('updates auth status based on auth status listener', () => {
      expect(component.userIsAuthenticated).toBeTruthy();
      authStatus$.next(false);
      expect(component.userIsAuthenticated).toBeFalsy();
    });

    test('updates group name based on groupName listener', () => {
      let groupName = 'groupName';
      groupName$.next(groupName);
      expect(component.groupName).toEqual(groupName);

      groupName = 'another';
      groupName$.next(groupName);
      expect(component.groupName).toEqual(groupName);
    });

    describe('notifications', () => {
      test('gets notifications', () => {
        jest.spyOn(userService, 'getNotificationsForUser');
        expect(userService.getNotificationsForUser).toHaveBeenCalled();
      });

      test('adds class if user has notifications', () => {
        notifications$.next([{
          id: null,
          type: 'group-join-request',
          recipient: 'blah',
          sender: 'blah2'
        }]);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.flicker'))).toBeTruthy();
      });

      test('doesnt add class if user has no notifications', () => {
        notifications$.next([]);
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.flicker'))).toBeFalsy();
      });
    });
  });
});
