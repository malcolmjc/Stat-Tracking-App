import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from 'src/app/app-routing.module';
import { NoGamesComponent } from './no-games.component';

@NgModule({
  declarations: [
    NoGamesComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    AppRoutingModule
  ],
  exports: [
    NoGamesComponent
  ]
})
export class NoGamesModule { }
