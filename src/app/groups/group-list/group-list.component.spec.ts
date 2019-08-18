import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { MatCardModule, MatRadioModule } from '@angular/material';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { GroupListComponent } from './group-list.component';
import { GroupService } from '../group.service';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';

describe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;
  let groupService: SpyObject<GroupService>;
  let toastr: SpyObject<ToastrService>;
  let router: SpyObject<Router>;

  beforeEach(async(() => {
    groupService = createSpyObject([
      'getCurrentGroup',
      'getGroupUpdateListener',
      'getGroups',
      'unselectGroup'
    ]);
    groupService.getGroupUpdateListener.mockReturnValue(of([]));
    toastr = createSpyObject(['success']);
    router = createSpyObject(['navigate']);

    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatRadioModule,
      ],
      declarations: [
        GroupListComponent,
        MockLoadingIndicatorComponent
      ],
      providers: [
        { provide: GroupService, useValue: groupService },
        { provide: ToastrService, useValue: toastr },
        { provide: Router, useValue: router }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
