import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notifications-display',
  templateUrl: './notifications-display.component.html',
  styleUrls: ['./notifications-display.component.css']
})
export class NotificationsDisplayComponent {
  @Input() public notifications: Notification[] = [];
}
