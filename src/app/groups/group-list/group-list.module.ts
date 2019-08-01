import { CommonModule } from '@angular/common';
import { MatCardModule, MatRadioModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { GroupListComponent } from './group-list.component';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';

@NgModule({
  declarations: [
    GroupListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatCardModule,
    MatRadioModule,
    LoadingIndicatorModule
  ],
  exports: [
    GroupListComponent
  ]
})
export class GroupListModule { }
