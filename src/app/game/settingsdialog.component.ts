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
  MatSelect,
  MatOption,
  MatLabel,
  MatSlideToggle,
  MatFormField,
  MatSnackBar,
  MatInput
} from '@angular/material';


import { Settings } from '../settings';

export interface SettingsDialogData {
  settings: Settings;
}



@Component({
  selector: 'app-settings-dialog',
  template: `
    <ng-template #human><mat-icon>person</mat-icon></ng-template
    ><ng-template #cpu><mat-icon>android</mat-icon></ng-template>
    <h1 mat-dialog-title>Settings</h1>
    <div mat-dialog-content>
      <div>
      <mat-form-field>
        <mat-label>Default Game</mat-label>
        <mat-select [(ngModel)]="data.settings.game">
          <mat-option value="onsets">On-Sets</mat-option>
          <mat-option value="equations">Equations</mat-option>
          </mat-select>
        </mat-form-field>
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.elementary"
          >Elementary Mode?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.fix_rolls"
          >Fix Illegal Rolls?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.auto_deal_minimum"
          >Auto-Deal Universe Minimum?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.show_goal"
          >Calculate and Show Goal?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.allow_reroll"
          >Allow re-rolls?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.messy_cards"
          >Messy Pieces?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.use_timer"
          >Use game timer?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.dev_mode"
          >Development mode?</mat-slide-toggle
        >
      </div>
      <div>
        <mat-form-field>
          <input
            matInput
            type="number"
            placeholder="Number of Players?"
            [(ngModel)]="data.settings.num_players"
            min="2"
            max="3"
          />
        </mat-form-field>
      </div>
      <div>
        <mat-form-field>
          <input
            matInput
            type="text"
            placeholder="Player 1 Name"
            [(ngModel)]="data.settings.player_names[0]"
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            type="color"
            placeholder="Player 1 Color"
            [(ngModel)]="data.settings.player_colors[0]"
          />
        </mat-form-field>

        <mat-slide-toggle
          [(ngModel)]="data.settings.player_human[0]"
          placeholder="Controlled by?"
        >
          <span
            *ngIf="data.settings.player_human[0]; then human; else cpu"
          ></span>
        </mat-slide-toggle>
      </div>
      <div>
        <mat-form-field>
          <input
            matInput
            type="text"
            placeholder="Player 2 Name"
            [(ngModel)]="data.settings.player_names[1]"
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            type="color"
            placeholder="Player 2 Color"
            [(ngModel)]="data.settings.player_colors[1]"
          />
        </mat-form-field>

        <mat-slide-toggle
          [(ngModel)]="data.settings.player_human[1]"
          placeholder="Controlled by?"
        >
          <span
            *ngIf="data.settings.player_human[1]; then human; else cpu"
          ></span>
        </mat-slide-toggle>
      </div>
      <div *ngIf="data.settings.num_players > 2">
        <mat-form-field>
          <input
            matInput
            type="text"
            placeholder="Player 3 Name"
            [(ngModel)]="data.settings.player_names[2]"
          />
        </mat-form-field>
        <mat-form-field>
          <input
            matInput
            type="color"
            placeholder="Player 3 Color"
            [(ngModel)]="data.settings.player_colors[2]"
          />
        </mat-form-field>

        <mat-slide-toggle
          [(ngModel)]="data.settings.player_human[2]"
          placeholder="Controlled by?"
        >
          <span
            *ngIf="data.settings.player_human[2]; then human; else cpu"
          ></span>
        </mat-slide-toggle>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">OK</button>
    </div>
  `
})
export class SettingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close(this.data.settings);
  }
}


