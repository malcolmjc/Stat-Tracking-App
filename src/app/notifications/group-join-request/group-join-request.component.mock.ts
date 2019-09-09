import { Component, Input } from '@angular/core';

import { Notification } from '../notification.model';

@Component({
  selector: 'app-group-join-request',
  template: 'MOCK group-join-request'
})
export class MockGroupJoinRequestComponent {
  @Input() public notification: Notification;
}
