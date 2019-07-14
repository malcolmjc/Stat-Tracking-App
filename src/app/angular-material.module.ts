import {
  MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatExpansionModule,
  MatTableModule,
  MatRadioModule,
  MatSelectModule,
  MatDividerModule,
  MatGridListModule,
  MatDialogModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule } from '@angular/material';
import { NgModule } from '@angular/core';

@NgModule({
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatTableModule,
    MatRadioModule,
    MatSelectModule,
    MatDividerModule,
    MatGridListModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ]
})
export class AngularMaterialModule { }
