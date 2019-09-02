import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material';

import { ImageUploaderComponent } from './image-uploader.component';

@NgModule({
  declarations: [
    ImageUploaderComponent
  ],
  exports: [
    ImageUploaderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class ImageUploaderModule { }
