import { CommonModule } from '@angular/common';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PlayerSelectionFormFieldComponent } from '../player-selection-form-field/player-selection-form-field.component';

@NgModule({
  declarations: [
    PlayerSelectionFormFieldComponent
  ],
  exports: [
    PlayerSelectionFormFieldComponent
  ],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule
  ]
})
export class PlayerSelectionFormFieldModule { }
