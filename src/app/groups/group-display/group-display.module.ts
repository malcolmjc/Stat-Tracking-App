import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GroupDisplayComponent } from './group-display.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [
    GroupDisplayComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ],
  exports: [
    GroupDisplayComponent
  ]
})
export class GroupDisplayModule { }
