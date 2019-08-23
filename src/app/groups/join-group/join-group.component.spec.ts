import { ActivatedRoute, Params, Router } from '@angular/router';
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { MatButtonModule, MatCardModule, MatAutocompleteModule, MatInputModule } from '@angular/material';

import { AuthService } from 'src/app/auth/auth.service';
import { GroupService } from '../group.service';
import { Group } from '../group.model';
import { JoinGroupComponent } from './join-group.component';
import { MockGroupDisplayComponent } from '../group-display/group-display.component.mock';
import { MockLoadingIndicatorComponent } from 'src/app/loading-indicator/loading-indicator.component.mock';
import { HttpErrorResponse } from '@angular/common/http';

describe('JoinGroupComponent', () => {
  let component: JoinGroupComponent;
  let fixture: ComponentFixture<JoinGroupComponent>;
  let groupService: SpyObject<GroupService>;
  let authService: SpyObject<AuthService>;
  let toastr: SpyObject<ToastrService>;
  let route: ActivatedRoute;
  let router: SpyObject<Router>;
  const group$ = new Subject<Group>();
  const responseGroups$ = new Subject<{ groups: any[]}>();
  const joinGroupRes$ = new Subject<{ message: string }>();

  const groupOne: Group = {
    id: 'fake-id',
    name: 'fake-name',
    password: 'fake-password',
    slogan: 'fake-slogan',
    description: 'fake-desc',
    admin: 'fake-admin',
    members: [],
    games: []
  };

  const groupTwo: Group = {
    id: 'fake-id2',
    name: 'fake-name2',
    password: 'fake-password2',
    slogan: 'fake-slogan2',
    description: 'fake-desc2',
    admin: 'fake-admin2',
    members: [],
    games: []
  };

  beforeEach(async(() => {
    groupService = createSpyObject(['getGroupById', 'findGroups', 'joinGroup']);
    groupService.getGroupById.mockReturnValue(group$.asObservable());
    groupService.findGroups.mockReturnValue(responseGroups$.asObservable());
    groupService.joinGroup.mockReturnValue(joinGroupRes$.asObservable());

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
        CommonModule,
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

  test('handles query params', () => {
    jest.spyOn(groupService, 'getGroupById');
    group$.next(groupOne);
    expect(groupService.getGroupById).toHaveBeenCalled();
    expect(component.selectedGroup).toEqual(groupOne);
    expect(component.groupControl.value).toEqual(groupOne.name);
  });

  describe('group search functionality', () => {
    const responseGroupOne = {
      ...groupOne,
      _id: groupOne.id
    };
    const responseGroupTwo = {
      ...groupTwo,
      _id: groupTwo.id
    };

    test('triggers search event on valid control changes', fakeAsync(() => {
      jest.spyOn(groupService, 'findGroups');
      const groupName = 'validGroupName';
      component.groupControl.setValue(groupName);
      expect(component.groupControl.invalid).toBeFalsy();
      tick(501); // 500ms debounce time on searches
      expect(groupService.findGroups).toHaveBeenCalledWith(groupName);

      responseGroups$.next({
        groups: [
          responseGroupOne,
          responseGroupTwo
        ]});
      expect(component.groups[0]).toEqual(responseGroupOne);
      expect(component.groups[1]).toEqual(responseGroupTwo);
    }));

    test('doesnt trigger findGroups event on invalid search value', fakeAsync(() => {
      jest.spyOn(groupService, 'findGroups');
      component.groupControl.setValue('123');
      expect(component.groupControl.invalid).toBeTruthy();
      tick(501); // 500ms debounce time on searches
      expect(groupService.findGroups).not.toHaveBeenCalled();
    }));

    test('doesnt trigger findGroups event on empty search', fakeAsync(() => {
      jest.spyOn(groupService, 'findGroups');
      component.groupControl.setValue('');
      tick(501); // 500ms debounce time on searches
      expect(groupService.findGroups).not.toHaveBeenCalled();
    }));

    test('sets groups to empty on empty search', fakeAsync(() => {
      component.groupControl.setValue('validGroupName');
      tick(501); // 500ms debounce time on searches

      responseGroups$.next({
        groups: [
          responseGroupOne,
          responseGroupTwo
        ]});
      expect(component.groups.length).toEqual(2);

      component.groupControl.setValue('');
      tick(501); // 500ms debounce time on searches
      expect(component.groups.length).toEqual(0);
    }));

    test('shows error if no search results found', fakeAsync(() => {
      jest.spyOn(toastr, 'error');
      component.groupControl.setValue('validGroupName');
      tick(501); // 500ms debounce time on searches

      responseGroups$.next({ groups: [] });
      expect(component.groups.length).toEqual(0);
      expect(toastr.error).toHaveBeenCalled();
    }));

    test('doesnt trigger search event if search value is the same', fakeAsync(() => {
      jest.spyOn(groupService, 'findGroups');
      component.groupControl.setValue('validGroupName');
      tick(501); // 500ms debounce time on searches
      expect(groupService.findGroups).toHaveBeenCalledTimes(1);
      component.groupControl.setValue('validGroupName');
      tick(501); // 500ms debounce time on searches
      expect(groupService.findGroups).toHaveBeenCalledTimes(1);
    }));
  });

  test('autocomplete options display', () => {
    component.groups = [groupOne, groupTwo];
    const input = fixture.debugElement.query(By.css('input')).nativeElement;
    input.dispatchEvent(new Event('focusin')); // need to select input
    fixture.detectChanges();
    const groupOptions = fixture.debugElement.queryAll(By.css('mat-option'));
    expect(groupOptions.length).toEqual(2);
    expect(groupOptions[0].nativeElement.textContent.trim()).toEqual(groupOne.name);
    expect(groupOptions[1].nativeElement.textContent.trim()).toEqual(groupTwo.name);
  });

  describe('select group functionality', () => {
    test('can select group', () => {
      component.selectGroup(groupOne);
      expect(component.selectedGroup).toEqual(groupOne);
      expect(component.groupControl.value).toEqual(groupOne.name);
    });

    test('query params are updated from selected group', () => {
      jest.spyOn(router, 'navigate');
      component.selectGroup(groupTwo);
      expect(router.navigate).toHaveBeenCalledWith([], {
        queryParams: {
          id: groupTwo.id
        },
        queryParamsHandling: 'merge',
      });
    });

    test('no group displayed before selection', () => {
      expect(component.form).toBeFalsy();
      const groupDisplay = fixture.debugElement.query(By.css('app-group-display'));
      expect(groupDisplay).toBeFalsy();
    });

    test('group displayed after selection', () => {
      component.selectGroup(groupOne);
      fixture.detectChanges();
      expect(component.form).toBeTruthy();
      const groupDisplay = fixture.debugElement.query(By.css('app-group-display')).nativeElement;
      expect(groupDisplay).toBeTruthy();
    });
  });

  describe('join group functionality', () => {
    beforeEach(() => {
      component.selectGroup(groupOne);
      fixture.detectChanges();
    });

    test('denies invalid form', () => {
      jest.spyOn(groupService, 'joinGroup');
      expect(component.form.invalid).toBeTruthy();
      component.onJoin();
      expect(groupService.joinGroup).not.toHaveBeenCalled();
    });

    test('accepts valid form', () => {
      jest.spyOn(groupService, 'joinGroup');
      const passwordControl: FormControl = component.form.controls.password;
      passwordControl.setValue('valid password');
      expect(component.form.invalid).toBeFalsy();
      component.onJoin();
      expect(groupService.joinGroup).toHaveBeenCalled();
    });

    test('starts loading after form submission, loading indicator displays', () => {
      const passwordControl: FormControl = component.form.controls.password;
      passwordControl.setValue('valid password');
      component.onJoin();
      expect(component.isLoading).toBeTruthy();
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('app-loading-indicator'))).toBeTruthy();
    });

    test('stops loading after on join returns', () => {
      const passwordControl: FormControl = component.form.controls.password;
      passwordControl.setValue('valid password');
      component.onJoin();
      expect(component.isLoading).toBeTruthy();
      joinGroupRes$.next({ message: 'joined group' });
      expect(component.isLoading).toBeFalsy();
    });

    test('handles error status 401', () => {
      jest.spyOn(toastr, 'error');
      const passwordControl: FormControl = component.form.controls.password;
      passwordControl.setValue('valid password');
      component.onJoin();
      joinGroupRes$.error(new HttpErrorResponse({ status: 401 }));
      expect(toastr.error).toHaveBeenCalled();
    });

    test('handles error status 409', () => {
      jest.spyOn(toastr, 'error');
      const passwordControl: FormControl = component.form.controls.password;
      passwordControl.setValue('valid password');
      component.onJoin();
      joinGroupRes$.error(new HttpErrorResponse({ status: 409 }));
      expect(toastr.error).toHaveBeenCalled();
    });
  });
});
