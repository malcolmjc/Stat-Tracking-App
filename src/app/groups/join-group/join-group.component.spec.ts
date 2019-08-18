import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule } from '@angular/material';

import { AuthService } from 'src/app/auth/auth.service';
import { GroupService } from '../group.service';
import { JoinGroupComponent } from './join-group.component';
import { MockGroupDisplayComponent } from '../group-display/group-display.component.mock';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';

describe('JoinGroupComponent', () => {
  let component: JoinGroupComponent;
  let fixture: ComponentFixture<JoinGroupComponent>;
  let groupService: SpyObject<GroupService>;
  let authService: SpyObject<AuthService>;
  let toastr: SpyObject<ToastrService>;
  let route: ActivatedRoute;
  let router: SpyObject<Router>;

  beforeEach(async(() => {
    groupService = createSpyObject(['getGroupById', 'findGroups', 'joinGroup']);
    authService = createSpyObject(['getUserName']);
    toastr = createSpyObject(['error', 'success']);
    router = createSpyObject(['navigate']);
    route = {
      queryParams: of({
        id: 'fake-id'
      }) as Observable<Params>
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatAutocompleteModule,
        MatInputModule,
        ReactiveFormsModule
      ],
      declarations: [
        JoinGroupComponent,
        MockLoadingIndicatorComponent,
        MockGroupDisplayComponent
      ],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: Router, useValue: router },
        { provide: GroupService, useValue: groupService },
        { provide: AuthService, useValue: authService },
        { provide: ToastrService, useValue: toastr }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
