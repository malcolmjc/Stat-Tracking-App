import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { CreateGroupComponent } from './create-group.component';
import { MatCardModule, MatButtonModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';

@NgModule({
  declarations: [
    CreateGroupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    LoadingIndicatorModule
  ],
  exports: [
    CreateGroupComponent
  ]
})
export class CreateGroupModule { }
