import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatButtonModule } from '@angular/material';
import { of, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Group } from '../group.model';
import { GroupComponent } from './group.component';
import { GroupService } from '../group.service';
import { MockGroupDisplayComponent } from '../group-display/group-display.component.mock';

describe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;
  let route: ActivatedRoute;
  let router: SpyObject<Router>;
  let groupService: SpyObject<GroupService>;
  let toastr: SpyObject<ToastrService>;
  let groupSubject = new Subject<Group>();

  beforeEach(async(() => {
    route = {
      queryParams: of({
        id: 'fake-id'
      }) as Observable<Params>
    } as ActivatedRoute;
    router = createSpyObject(['navigate']);
    groupService = createSpyObject(['getGroupById', 'setCurrentGroup']);
    toastr = createSpyObject(['error']);
    groupService.getGroupById.mockReturnValue(groupSubject.asObservable());

    TestBed.configureTestingModule({
      imports: [
        MatButtonModule
      ],
      declarations: [
        GroupComponent,
        MockGroupDisplayComponent
      ],
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

  describe('ngOnInit behavior', () => {
    test('should handle query params with group', () => {
      jest.spyOn(groupService, 'getGroupById');
      const fakeGroup = {
        id: null,
        name: 'name',
        password: 'password',
        admin: 'fake',
        games: [],
        members: []
      };
      groupSubject.next(fakeGroup);
      expect(groupService.getGroupById).toHaveBeenCalled();
      expect(component.group).toEqual(fakeGroup);
    });

    test('should handle query params with null group', () => {
      jest.spyOn(groupService, 'getGroupById');
      jest.spyOn(toastr, 'error');
      jest.spyOn(router, 'navigate');
      groupSubject.next(null);
      expect(groupService.getGroupById).toHaveBeenCalled();
      expect(toastr.error).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/my-groups']);
    });
  });

  describe('group buttons work correctly', () => {
    let buttons: DebugElement[];
    let group: Group;

    beforeEach(() => {
      group = {
        id: 'fake-id',
        name: 'name',
        password: 'password',
        admin: 'fake',
        games: [],
        members: []
      };
      groupSubject.next(group);
      fixture.detectChanges();
      buttons = fixture.debugElement.queryAll(By.css('.link-button'));
    });

    test('add member button works', () => {
      jest.spyOn(component, 'addMemberClicked');
      jest.spyOn(router, 'navigate');
      const addMemberButton = buttons[0].nativeElement;
      addMemberButton.click();
      fixture.detectChanges();
      expect(component.addMemberClicked).toHaveBeenCalled();
      // TODO - functionality hasn't been implemented
      // expect(groupService.setCurrentGroup).toHaveBeenCalledWith(group.id);
      // expect(router.navigate).toHaveBeenCalledWith(['/select-players']);
    });

    test('add new game button works', () => {
      jest.spyOn(component, 'addNewGameClicked');
      jest.spyOn(groupService, 'setCurrentGroup');
      jest.spyOn(router, 'navigate');
      const addNewGameButton = buttons[1].nativeElement;
      addNewGameButton.click();
      fixture.detectChanges();
      expect(component.addNewGameClicked).toHaveBeenCalled();
      expect(groupService.setCurrentGroup).toHaveBeenCalledWith(group.id);
      expect(router.navigate).toHaveBeenCalledWith(['/select-players']);
    });

    test('view all games button works', () => {
      jest.spyOn(component, 'viewAllGamesClicked');
      jest.spyOn(groupService, 'setCurrentGroup');
      jest.spyOn(router, 'navigate');
      const viewAllGamesButton = buttons[2].nativeElement;
      viewAllGamesButton.click();
      fixture.detectChanges();
      expect(component.viewAllGamesClicked).toHaveBeenCalled();
      expect(groupService.setCurrentGroup).toHaveBeenCalledWith(group.id);
      expect(router.navigate).toHaveBeenCalledWith(['']);
    });

    test('view leaderboard button works', () => {
      jest.spyOn(component, 'viewLeaderboardClicked');
      jest.spyOn(groupService, 'setCurrentGroup');
      jest.spyOn(router, 'navigate');
      const viewLeaderboardButton = buttons[3].nativeElement;
      viewLeaderboardButton.click();
      fixture.detectChanges();
      expect(component.viewLeaderboardClicked).toHaveBeenCalled();
      expect(groupService.setCurrentGroup).toHaveBeenCalledWith(group.id);
      expect(router.navigate).toHaveBeenCalledWith(['/leaderboard']);
    });
  });
});
