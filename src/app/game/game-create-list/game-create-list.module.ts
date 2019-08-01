import { MatButtonModule, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule } from '@angular/material';
import { NgModule } from '@angular/core';

import { DialogContentCancelComponent } from './dialogs/dialog-cancel/dialog-content-cancel.component';
import { DialogContentDoneComponent } from './dialogs/dialog-done/dialog-content-done.component';
import { DialogContentFailureComponent } from './dialogs/dialog-failure/dialog-content-failure.component';
import { GameCreateListComponent } from './game-create-list.component';
import { GameCreateModule } from '../game-create/game-create-module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GameCreateListComponent,
    DialogContentDoneComponent,
    DialogContentFailureComponent,
    DialogContentCancelComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    GameCreateModule
  ],
  exports: [
    GameCreateListComponent,
    DialogContentDoneComponent,
    DialogContentFailureComponent,
    DialogContentCancelComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
  ],
  entryComponents: [
    DialogContentDoneComponent,
    DialogContentFailureComponent,
    DialogContentCancelComponent
  ],
})
export class GameCreateListModule { }
