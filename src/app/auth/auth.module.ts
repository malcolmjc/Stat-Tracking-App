import { NgModule } from '@angular/core';

import { LoginModule } from './login/login.module';
import { SignupModule } from './signup/signup.module';

@NgModule({
  exports: [
    LoginModule,
    SignupModule
  ]
})
export class AuthModule { }
