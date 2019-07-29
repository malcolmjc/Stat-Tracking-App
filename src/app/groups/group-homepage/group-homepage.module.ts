import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { GroupHomepageComponent } from './group-homepage.component';
import { MatButtonModule } from '@angular/material';
import { GroupListModule } from '../group-list/group-list.module';

@NgModule({
  declarations: [
    GroupHomepageComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatButtonModule,
    GroupListModule
  ],
  exports: [
    GroupHomepageComponent
  ]
})
export class GroupHomepageModule { }
