import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule, MatCardModule } from '@angular/material';

import { Subject } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { GroupJoinRequestComponent } from './group-join-request.component';
import { GroupService } from 'src/app/groups/group.service';
import { Notification } from '../notification.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  template: '<app-group-join-request [notification]="notification"></app-group-join-request>'
})
class TestComponent {
  @ViewChild(GroupJoinRequestComponent) component: GroupJoinRequestComponent;
  public notification: Notification = {
    sender: 'sender',
    recipient: 'recipient',
    type: 'group-join-request',
    id: 'test-id',
    details: {
      groupName: 'group-name'
    }
  };
}

describe('GroupJoinRequestComponent', () => {
  let component: GroupJoinRequestComponent;
  let testComponent: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let authService: SpyObject<AuthService>;
  let groupService: SpyObject<GroupService>;
  let userService: SpyObject<UserService>;
  let toastr: SpyObject<ToastrService>;
  const joinGroupResponse$ = new Subject<void>();
  const deleteResponse$ = new Subject<{ message: string}>();

  beforeEach(async(() => {
    authService = createSpyObject(['getUserId']);
    groupService = createSpyObject(['joinGroup']);
    groupService.joinGroup.mockReturnValue(joinGroupResponse$.asObservable());
    toastr = createSpyObject(['error', 'success']);
    userService = createSpyObject(['deleteNotification']);
    userService.deleteNotification.mockReturnValue(deleteResponse$.asObservable());

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule
      ],
      declarations: [
        GroupJoinRequestComponent,
        TestComponent
      ],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: GroupService, useValue: groupService },
        { provide: UserService, useValue: userService },
        { provide: ToastrService, useValue: toastr }
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

  describe('declineClicked', () => {
    test('should delete notification', () => {
      jest.spyOn(userService, 'deleteNotification');
      component.declineClicked();
      expect(userService.deleteNotification).toHaveBeenCalled();
    });

    test('should emit an event on successful deletion', () => {
      jest.spyOn(component.wasDeleted, 'emit');
      component.declineClicked();
      deleteResponse$.next({ message: 'blah' });
      expect(component.wasDeleted.emit).toHaveBeenCalledWith(testComponent.notification.id);
    });
  });

  describe('acceptClicked', () => {
    test('should join group', () => {
      jest.spyOn(groupService, 'joinGroup');
      component.acceptClicked();
      expect(groupService.joinGroup).toHaveBeenCalled();
    });

    test('should display message on successful group join', () => {
      jest.spyOn(toastr, 'success');
      component.acceptClicked();
      joinGroupResponse$.next();
      expect(toastr.success).toHaveBeenCalled();
    });

    test('should delete notification and emit event', () => {
      jest.spyOn(component.wasDeleted, 'emit');
      jest.spyOn(userService, 'deleteNotification');
      component.acceptClicked();
      joinGroupResponse$.next();
      expect(userService.deleteNotification).toHaveBeenCalled();
      deleteResponse$.next({ message: 'blah' });
      expect(component.wasDeleted.emit).toHaveBeenCalledWith(testComponent.notification.id);
    });
  });

  describe('toastr messages', () => {
    test('should show toastr accept error on error of joining group', () => {
      jest.spyOn(toastr, 'error');
      component.acceptClicked();
      joinGroupResponse$.error(new HttpErrorResponse({ status: 500}));
      expect(toastr.error).toHaveBeenCalled();
    });

    test('should show toastr decline error on error of deletion', () => {
      jest.spyOn(toastr, 'error');
      component.declineClicked();
      deleteResponse$.error(new HttpErrorResponse({ status: 500}));
      expect(toastr.error).toHaveBeenCalled();
    });
  });
});
