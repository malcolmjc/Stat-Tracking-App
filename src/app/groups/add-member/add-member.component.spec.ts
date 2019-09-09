import { ActivatedRoute, Params } from '@angular/router';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule, MatCardModule, MatInputModule, MatProgressSpinnerModule, MatAutocompleteModule } from '@angular/material';
import { of, Observable, Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { AddMemberComponent } from './add-member.component';
import { AuthService } from 'src/app/auth/auth.service';
import { Group } from '../group.model';
import { GroupService } from '../group.service';
import { MockUserDisplayComponent } from 'src/app/user/user-display/user-display.component.mock';
import { UserService } from 'src/app/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  template: '<app-add-member [group]="group"></app-add-member>'
})
class TestComponent {
  @ViewChild(AddMemberComponent) public component: AddMemberComponent;
  public group: Group = {
    id: 'fake-id',
    games: [],
    members: [],
    name: 'name',
    password: 'password',
    admin: 'admin'
  };
}

describe('AddMemberComponent', () => {
  let component: AddMemberComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let authService: SpyObject<AuthService>;
  let groupService: SpyObject<GroupService>;
  let userService: SpyObject<UserService>;
  let toastr: SpyObject<ToastrService>;
  let route: ActivatedRoute;
  const testGroup: Group = {
    id: 'test-id',
    games: [],
    members: [],
    name: 'test-name',
    password: 'test-password',
    admin: 'test-admin'
  };
  const addNotificationToUserRes$ = new Subject<void>();

  beforeEach(async(() => {
    authService = createSpyObject(['getUserName']);
    userService = createSpyObject(['addNotificationToUser', 'findUsers']);
    userService.addNotificationToUser.mockReturnValue(addNotificationToUserRes$.asObservable());
    groupService = createSpyObject(['getGroupById']);
    groupService.getGroupById.mockReturnValue(of(testGroup));
    toastr = createSpyObject(['error', 'success']);
    route = {
      queryParams: of({
        groupId: 'test-group-id'
      }) as Observable<Params>
    } as ActivatedRoute;

    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatAutocompleteModule,
        ReactiveFormsModule
      ],
      declarations: [
        AddMemberComponent,
        TestComponent,
        MockUserDisplayComponent
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: GroupService, useValue: groupService },
        { provide: UserService, useValue: userService },
        { provide: ToastrService, useValue: toastr },
        { provide: ActivatedRoute, useValue: route }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    component = testComponent.component;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should handle query params', () => {
    jest.spyOn(groupService, 'getGroupById');
    expect(groupService.getGroupById).toHaveBeenCalledWith('test-group-id', ['name', 'password', 'members']);
    expect(component.group).toEqual(testGroup);
  });

  test('selectUser', () => {
    component.selectUser('fake-username');
    expect(component.selectedUsername === 'fake-username');
  });

  /* Not gonna write form tests because there are existing tests in join-group and I'm
   planning on refactoring the form into a generic component that can be used by both */

  describe('addMemberClicked', () => {
    test('shows loading indicator', () => {
      component.addMemberClicked();
      expect(component.sendingNotification).toBeTruthy();
    });

    test('adds notification to user', () => {
      jest.spyOn(userService, 'addNotificationToUser');
      component.addMemberClicked();
      expect(userService.addNotificationToUser).toHaveBeenCalled();
    });

    test('handles success response', () => {
      jest.spyOn(toastr, 'success');
      component.addMemberClicked();
      addNotificationToUserRes$.next();
      expect(component.sendingNotification).toBeFalsy();
      expect(toastr.success).toHaveBeenCalled();
    });

    test('handles error response', () => {
      jest.spyOn(toastr, 'error');
      component.addMemberClicked();
      addNotificationToUserRes$.error(new HttpErrorResponse({ status: 500 }));
      expect(component.sendingNotification).toBeFalsy();
      expect(toastr.error).toHaveBeenCalled();
    });
  });
});
