import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatInputModule, MatAutocompleteModule, MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AddMemberComponent } from './add-member.component';
import { UserDisplayModule } from 'src/app/user/user-display/user-display.module';

@NgModule({
  declarations: [
    AddMemberComponent
  ],
  imports: [
    UserDisplayModule,

    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports: [
    AddMemberComponent
  ]
})
export class AddMemberModule { }
