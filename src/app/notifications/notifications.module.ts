import { NgModule } from '@angular/core';

import { NotificationsDisplayModule } from './notifications-display/notifications-display.module';

@NgModule({
  exports: [
    NotificationsDisplayModule
  ]
})
export class NotificationsModule { }
