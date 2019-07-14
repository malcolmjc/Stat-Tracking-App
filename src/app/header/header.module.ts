import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
