import {
  Component,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  Inject,
  Injectable,
  ReflectiveInjector,
  Injector,
  Input,
  OnInit
} from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MatSlideToggle,
  MatFormField,
  MatSnackBar,
  MatInput
} from '@angular/material';


export interface ChallengeDialogData {
  challenge: string;
}

@Component({
  selector: 'app-challenge-dialog',
  template: `
    <h1 mat-dialog-title>Challenge Now!</h1>
    {{ data.challenge }}
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">OK</button>
    </div>
  `
})
export class ChallengeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ChallengeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ChallengeDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.data.challenge);
  }
}
