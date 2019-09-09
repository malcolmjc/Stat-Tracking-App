import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material';

import { MockGroupJoinRequestComponent } from '../group-join-request/group-join-request.component.mock';
import { Notification } from '../notification.model';
import { NotificationsDisplayComponent } from './notifications-display.component';

describe('NotificationsDisplayComponent', () => {
  let component: NotificationsDisplayComponent;
  let fixture: ComponentFixture<NotificationsDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatCardModule
      ],
      declarations: [
        NotificationsDisplayComponent,
        MockGroupJoinRequestComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('removeNotification', () => {
    const testArr: Notification[] = [
      { type: 'group-join-request', recipient: 'blah', sender: 'blah', id: 'test' },
      { type: 'group-join-request', recipient: 'blah2', sender: 'blah2', id: 'test' },
      { type: 'group-join-request', recipient: 'blah3', sender: 'blah3', id: 'test2' },
    ];

    test('should filter out notification of specified id', () => {
      component.notifications = testArr;
      component.removeNotification('test2');
      expect(component.notifications.length).toEqual(2);
      expect(component.notifications[0]).toEqual(testArr[0]);
      expect(component.notifications[1]).toEqual(testArr[1]);
    });

    test('should filter out multiple notifications of specified id', () => {
      component.notifications = testArr;
      component.removeNotification('test');
      expect(component.notifications.length).toEqual(1);
      expect(component.notifications[0]).toEqual(testArr[2]);
    });
  });
});
