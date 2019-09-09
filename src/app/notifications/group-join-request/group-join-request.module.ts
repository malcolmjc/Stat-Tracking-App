import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GroupJoinRequestComponent } from './group-join-request.component';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [
    GroupJoinRequestComponent
  ],
  exports: [
    GroupJoinRequestComponent
  ]
})
export class GroupJoinRequestModule { }
