import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material';

import { GroupJoinRequestModule } from '../group-join-request/group-join-request.module';
import { NotificationsDisplayComponent } from './notifications-display.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    GroupJoinRequestModule
  ],
  declarations: [
    NotificationsDisplayComponent
  ],
  exports: [
    NotificationsDisplayComponent
  ]
})
export class NotificationsDisplayModule { }
