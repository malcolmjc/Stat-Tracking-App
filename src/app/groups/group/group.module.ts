import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { GroupComponent } from './group.component';
import { GroupDisplayModule } from '../group-display/group-display.module';

@NgModule({
  declarations: [
    GroupComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    GroupDisplayModule
  ],
  exports: [
    GroupComponent
  ]
})
export class GroupModule { }
