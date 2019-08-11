import { CommonModule } from '@angular/common';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    FontAwesomeModule,

    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
