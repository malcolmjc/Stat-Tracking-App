import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule } from '@angular/material';

import { AuthService } from 'src/app/auth/auth.service';
import { GroupDisplayModule } from '../group-display/group-display.module';
import { GroupService } from '../group.service';
import { JoinGroupComponent } from './join-group.component';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
        ReactiveFormsModule,
        // TODO: Mock these components
        LoadingIndicatorModule,
        GroupDisplayModule
      ],
      declarations: [ JoinGroupComponent ],
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
