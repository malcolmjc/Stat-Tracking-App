import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { MatCardModule, MatRadioModule } from '@angular/material';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { Group } from '../group.model';
import { GroupListComponent } from './group-list.component';
import { GroupService } from '../group.service';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';

describe('GroupListComponent', () => {
  let component: GroupListComponent;
  let fixture: ComponentFixture<GroupListComponent>;
  let groupService: SpyObject<GroupService>;
  let toastr: SpyObject<ToastrService>;
  let router: SpyObject<Router>;
  const group$ = new Subject<Group[]>();
  const groupId = 'fake-group-id';

  beforeEach(async(() => {
    groupService = createSpyObject([
      'getCurrentGroup',
      'getGroupUpdateListener',
      'getGroups',
      'setCurrentGroup',
      'unselectGroup'
    ]);
    groupService.getGroupUpdateListener.mockReturnValue(group$.asObservable());
    groupService.getCurrentGroup.mockReturnValue(groupId);
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

  describe('loading indicator functionality', () => {
    test('should be loading onInit', () => {
      expect(component.isLoading).toBeTruthy();
    });

    test('should stop loading when it receives group', () => {
      group$.next([]);
      expect(component.isLoading).toBeFalsy();
    });
  });

  describe('group behavior', () => {
    const groupOne: Group = {
      id: 'fake-id',
      name: 'fake-name',
      password: 'fake-password',
      slogan: 'fake-slogan',
      description: 'fake-description',
      admin: 'fake-admin',
      members: ['member1', 'member2'],
      games: []
    };

    const groupTwo: Group = {
      id: 'fake-id2',
      name: 'fake-name2',
      password: 'fake-password2',
      slogan: 'fake-slogan2',
      description: 'fake-description2',
      admin: 'fake-admin2',
      members: ['member12', 'member22'],
      games: []
    };

    test('gets current group id', () => {
      expect(component.selectedGroupId).toEqual(groupId);
    });

    test('displays groups', () => {
      group$.next([groupOne, groupTwo]);
      fixture.detectChanges();
      const groupCards = fixture.debugElement.queryAll(By.css('mat-card'));
      expect(groupCards.length).toEqual(2);
    });

    test('displays message if no groups', () => {
      const shouldBeNull = fixture.debugElement.query(By.css('.no-groups-message'));
      // should not display while loading
      expect(shouldBeNull).toBeFalsy();
      group$.next([]);
      fixture.detectChanges();
      const message = fixture.debugElement.query(By.css('.no-groups-message')).nativeElement;
      expect(message).toBeTruthy();
    });

    test('onGroupClicked', () => {
      jest.spyOn(component, 'onGroupClicked');
      jest.spyOn(router, 'navigate');
      group$.next([groupOne]);
      fixture.detectChanges();
      const groupCard = fixture.debugElement.query(By.css('mat-card')).nativeElement;
      groupCard.click();
      expect(component.onGroupClicked).toHaveBeenCalledWith(groupOne.id);
      expect(router.navigate).toHaveBeenCalledWith(['group'], { queryParams: { id: groupOne.id } });
    });

    test('onGroupSelected is called', () => {
      jest.spyOn(component, 'onGroupSelected');
      group$.next([groupOne]);
      fixture.detectChanges();
      const groupRadioButton = fixture.debugElement.query(By.css('mat-radio-button')).nativeElement;
      groupRadioButton.click();
      expect(component.onGroupSelected).toHaveBeenCalledWith(groupOne, jasmine.any(MouseEvent));
    });

    test('onGroupSelected sets current group if not currently selected', () => {
      jest.spyOn(groupService, 'setCurrentGroup');
      jest.spyOn(toastr, 'success');
      group$.next([groupOne]);
      fixture.detectChanges();
      const groupRadioButton = fixture.debugElement.query(By.css('mat-radio-button')).nativeElement;
      groupRadioButton.click();
      expect(groupService.setCurrentGroup).toHaveBeenCalled();
      expect(component.selectedGroupId).toEqual(groupOne.id);
      expect(toastr.success).toHaveBeenCalled();
    });

    test('onGroupSelected unselects current group if already selected', () => {
      jest.spyOn(groupService, 'unselectGroup');
      jest.spyOn(toastr, 'success');
      group$.next([groupOne]);
      fixture.detectChanges();
      const groupRadioButton = fixture.debugElement.query(By.css('mat-radio-button')).nativeElement;
      groupRadioButton.click();
      fixture.detectChanges();
      groupRadioButton.click();
      fixture.detectChanges();

      const groupRadioButtons = fixture.debugElement.queryAll(By.css('mat-radio-button'));
      expect(groupService.unselectGroup).toHaveBeenCalled();
      expect(toastr.success).toHaveBeenCalled();
      groupRadioButtons.forEach((radioButtonDebugElem) => {
        expect(radioButtonDebugElem.nativeElement.checked).toBeFalsy();
      });
    });
  });
});
