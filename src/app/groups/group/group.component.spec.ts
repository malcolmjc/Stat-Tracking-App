import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of, Observable } from 'rxjs';
import { MatButtonModule } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

import { GroupComponent } from './group.component';
import { GroupDisplayModule } from '../group-display/group-display.module';
import { GroupService } from '../group.service';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;
  let route: ActivatedRoute;
  let router: SpyObject<Router>;
  let groupService: SpyObject<GroupService>;
  let toastr: SpyObject<ToastrService>;

  beforeEach(async(() => {
    route = {
      queryParams: of({
        id: 'fake-id'
      }) as Observable<Params>
    } as ActivatedRoute;
    router = createSpyObject(['navigate']);
    groupService = createSpyObject(['getGroupById', 'setCurrentGroup']);
    toastr = createSpyObject(['error']);

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        // TODO: mock this component
        GroupDisplayModule
      ],
      declarations: [ GroupComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: Router, useValue: router },
        { provide: GroupService, useValue: groupService },
        { provide: ToastrService, useValue: toastr }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
