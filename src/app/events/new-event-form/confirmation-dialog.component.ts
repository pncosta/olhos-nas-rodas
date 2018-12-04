import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
    title: string;
    subtitle: string;
  }

@Component({
    selector: 'confirmation-dialog',
    templateUrl: 'confirmation-dialog.component.html',
  })
  export class ConfirmationDialogComponent {
  
    constructor(
      public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close('no');
    }

    onYesClick(): void {
      this.dialogRef.close('yes');
      }
  
  }