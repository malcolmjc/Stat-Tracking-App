import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
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
