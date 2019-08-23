import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { Subject } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { GroupService } from '../groups/group.service';
import { HeaderComponent } from './header.component';
import { MockFontAwesomeModule } from '../font-awesome.mock.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: SpyObject<AuthService>;
  let groupService: SpyObject<GroupService>;
  const groupName$ = new Subject<string>();
  const authStatus$ = new Subject<boolean>();
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
        { provide: GroupService, useValue: groupService }
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
  });
});
