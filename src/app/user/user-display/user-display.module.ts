import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserDisplayComponent } from './user-display.component';

@NgModule({
  declarations: [
    UserDisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UserDisplayComponent
  ]
})
export class UserDisplayModule { }
