import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GroupDisplayComponent } from './group-display.component';
import { UserDisplayModule } from 'src/app/user/user-display/user-display.module';

@NgModule({
  declarations: [
    GroupDisplayComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    UserDisplayModule
  ],
  exports: [
    GroupDisplayComponent
  ]
})
export class GroupDisplayModule { }
