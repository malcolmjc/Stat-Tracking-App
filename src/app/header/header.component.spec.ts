import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { of } from 'rxjs';

import { AuthService } from '../auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GroupService } from '../groups/group.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: SpyObject<AuthService>;
  let groupService: SpyObject<GroupService>;

  beforeEach(async(() => {
    authService = createSpyObject([
      'getUserName',
      'getIsAuthenticated',
      'getAuthStatusListener',
      'logout'
    ]);
    authService.getAuthStatusListener.mockReturnValue(of(true));

    groupService = createSpyObject([
      'getCurrentGroupName',
      'getCurrentGroupListener'
    ]);
    groupService.getCurrentGroupListener.mockReturnValue(of('fake-group-name'));

    TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
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
});
