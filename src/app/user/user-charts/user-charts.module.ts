import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserChartsComponent } from './user-charts.component';

@NgModule({
  declarations: [
    UserChartsComponent,
  ],
  exports: [
    UserChartsComponent,
  ],
  imports: [
    CommonModule
  ]
})
export class UserChartsModule { }
