import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MatGridListModule, MatSelectModule, MatCardModule, MatRadioModule } from '@angular/material';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ConvertNaNPipe } from 'src/app/pipes/convert-nan.pipe';
import { GroupService } from 'src/app/groups/group.service';
import { UserService } from '../user.service';
import { UserStatsComponent } from './user-stats.component';

describe('UserStatsComponent', () => {
  let component: UserStatsComponent;
  let fixture: ComponentFixture<UserStatsComponent>;
  let userService: SpyObject<UserService>;
  let groupService: SpyObject<GroupService>;
  let toastr: SpyObject<ToastrService>;

  beforeEach(async(() => {
    userService = createSpyObject(['getUserStatsInGroup', 'getUserStatsAllTime']);
    userService.getUserStatsAllTime.mockReturnValue(of([]));
    userService.getUserStatsInGroup.mockReturnValue(of([]));

    groupService = createSpyObject(['getCurrentGroup']);
    toastr = createSpyObject(['error']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatGridListModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule
      ],
      declarations: [
        ConvertNaNPipe,
        UserStatsComponent
      ],
      providers: [
        { provide: UserService, useValue: userService },
        { provide: GroupService, useValue: groupService },
        { provide: ToastrService, useValue: toastr }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
