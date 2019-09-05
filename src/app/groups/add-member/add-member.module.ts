import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { NgModule } from '@angular/core';

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
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports: [
    AddMemberComponent
  ]
})
export class AddMemberModule { }
