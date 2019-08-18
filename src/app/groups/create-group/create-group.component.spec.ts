import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { CreateGroupComponent } from './create-group.component';
import { GroupService } from '../group.service';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';

describe('CreateGroupComponent', () => {
  let component: CreateGroupComponent;
  let fixture: ComponentFixture<CreateGroupComponent>;
  let groupService: SpyObject<GroupService>;
  let router: SpyObject<Router>;
  let toastr: SpyObject<ToastrService>;

  beforeEach(async(() => {
    groupService = createSpyObject(['createGroup', 'getGroupCreatedListener']);
    groupService.getGroupCreatedListener.mockReturnValue(of(false));

    router = createSpyObject(['navigate']);
    toastr = createSpyObject(['error']);

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        // TODO: mock this component
        LoadingIndicatorModule
      ],
      declarations: [ CreateGroupComponent ],
      providers: [
        { provide: GroupService, useValue: groupService },
        { provide: Router, useValue: router },
        { provide: ToastrService, useValue: toastr }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
