import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { LoadingIndicatorComponent } from './loading-indicator.component';

@NgModule({
  declarations: [
    LoadingIndicatorComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoadingIndicatorComponent
  ]
})
export class LoadingIndicatorModule { }
