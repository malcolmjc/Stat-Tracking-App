import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatCardModule } from '@angular/material';

import { GroupService } from 'src/app/groups/group.service';
import { NoGamesComponent } from './no-games.component';

describe('NoGamesComponent', () => {
  let component: NoGamesComponent;
  let fixture: ComponentFixture<NoGamesComponent>;
  let groupService: SpyObject<GroupService>;

  beforeEach(async(() => {
    groupService = createSpyObject(['getCurrentGroup']);
    groupService.getCurrentGroup.mockReturnValue('groupId');

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule
      ],
      declarations: [ NoGamesComponent ],
      providers: [
        { provide: GroupService, useValue: groupService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('gets inGroup status correctly', () => {
    expect(component.inGroup).toBeTruthy();
  });

  test('group buttons dont show when in group', () => {
    component.inGroup = true;
    expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(1);
  });

  test('group button do show when not in group', () => {
    component.inGroup = false;
    fixture.detectChanges();
    expect(fixture.debugElement.queryAll(By.css('button')).length).toEqual(3);
  });
});
