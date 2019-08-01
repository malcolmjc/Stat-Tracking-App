import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupDisplayModule } from '../group-display/group-display.module';
import { JoinGroupComponent } from './join-group.component';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';

@NgModule({
  declarations: [
    JoinGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    LoadingIndicatorModule,
    GroupDisplayModule
  ],
  exports: [
    JoinGroupComponent
  ]
})
export class JoinGroupModule { }
