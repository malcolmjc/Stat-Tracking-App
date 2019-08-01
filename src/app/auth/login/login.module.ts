import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    LoadingIndicatorModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
