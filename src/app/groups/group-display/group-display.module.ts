import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { GroupDisplayComponent } from './group-display.component';

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
