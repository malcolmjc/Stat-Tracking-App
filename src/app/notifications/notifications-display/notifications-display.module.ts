import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material';

import { NotificationsDisplayComponent } from './notifications-display.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule
  ],
  declarations: [
    NotificationsDisplayComponent
  ],
  exports: [
    NotificationsDisplayComponent
  ]
})
export class NotificationsDisplayModule { }
