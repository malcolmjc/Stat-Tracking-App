import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatCardModule } from '@angular/material';

import { ImageUploaderModule } from 'src/app/image-uploader/image-uploader.module';
import { LoadingIndicatorModule } from 'src/app/loading-indicator/loading-indicator.module';
import { UserProfileComponent } from './user-profile.component';

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
    MatCardModule,
    LoadingIndicatorModule
  ]
})
export class UserProfileModule { }
