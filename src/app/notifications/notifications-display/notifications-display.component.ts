import { Component, Input } from '@angular/core';

import { Notification } from '../notification.model';

@Component({
  selector: 'app-notifications-display',
  templateUrl: './notifications-display.component.html',
  styleUrls: ['./notifications-display.component.css']
})
export class NotificationsDisplayComponent {
  @Input() public notifications: Notification[] = [];

  public removeNotification(id: string) {
    this.notifications = this.notifications.filter((notification) => notification.id !== id);
  }
}
