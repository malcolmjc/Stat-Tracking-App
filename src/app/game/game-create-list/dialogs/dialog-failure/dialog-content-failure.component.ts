import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-content-failure',
  templateUrl: './dialog-content-failure.html',
})
export class DialogContentFailureComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContentFailureComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) {}
}
