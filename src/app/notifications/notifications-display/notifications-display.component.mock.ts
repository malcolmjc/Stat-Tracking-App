import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifications-display',
  template: 'MOCK notifications-display'
})
export class MockNotificationsDisplayComponent {
  @Input() public notifications: Notification[] = [];
}
