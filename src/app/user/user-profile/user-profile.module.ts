import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material';

import { UserProfileComponent } from './user-profile.component';
import { ImageUploaderModule } from 'src/app/image-uploader/image-uploader.module';

@NgModule({
  declarations: [
    UserProfileComponent
  ],
  exports: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    ImageUploaderModule,
    MatCardModule
  ]
})
export class UserProfileModule { }
