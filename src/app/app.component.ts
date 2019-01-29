import { Component, ChangeDetectorRef, Output, EventEmitter, ViewChildren, QueryList, Inject } from '@angular/core';

import { Deck } from './equipment/cards/deck';

import {NumbercubeComponent} from './equipment/cubes/numbercube/numbercube.component';
import {ColorcubeComponent} from './equipment/cubes/colorcube/colorcube.component';
import {RelationcubeComponent} from './equipment/cubes/relationcube/relationcube.component';
import {OperationcubeComponent} from './equipment/cubes/operationcube/operationcube.component';
import {Card} from './equipment/cards/card/card';
import {Settings} from './settings';

import { trigger, style, transition, animate, group } from '@angular/animations';
import {CardComponent} from './equipment/cards/card/card.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogConfig, MatSlideToggle, MatFormField } from '@angular/material';
import { FormControl } from '@angular/forms';

export interface SettingsDialogData {
  settings: Settings;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({transform: 'translateY(-100%)'}),
        animate(300)
      ]),
      transition(':leave', [
        group([
          animate('0.2s 0.1s ease', style({
            opacity: 0
          }))
        ])
      ])
    ])
  ]


})
export class AppComponent {
  title = 'onsets';
  displayCards: number;
  deck: any;
  universe: Array<Card>;
  numCards: any;
  showSettings: boolean;
  showDice: boolean;
  goalSet: boolean;
  universeSet: boolean;
  stage: number;
  settings: Settings;

  @ViewChildren(ColorcubeComponent) colorCubes: QueryList<any>;
  @ViewChildren(RelationcubeComponent) relationCubes: QueryList<any>;
  @ViewChildren(OperationcubeComponent) operationCubes: QueryList<any>;
  @ViewChildren(NumbercubeComponent) numberCubes: QueryList<any>;
  @ViewChildren(CardComponent) cards: QueryList<any>;

  constructor(private ref: ChangeDetectorRef, public settingsDialog: MatDialog) {
    this.settings = new Settings();
    this.settings.elementary = false;
    this.stage = 0;
    this.universeSet = false;
    this.goalSet = false;
    this.universe = [];
    this.displayCards = 6;
    this.showSettings = true;
    this.showDice = true;
    this.reconstruct();
  }

  openSettings(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {settings: this.settings};
    const dialogRef = this.settingsDialog.open(SettingsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.settings = result;
    });
  }

  add_card() {
    this.universe.push(this.deck.cards.pop());
    setTimeout(() => { this.cards.forEach( (c) => { c.flip(); }); }, 200);
  }

  reconstruct() {
    this.stage = 0;
    this.universeSet = false;
    this.goalSet = false;
    this.universe = [];
    this.deck = new Deck();
    this.deck.shuffle();

    for (const i of this.arrayNums(6)) {
      this.universe.push(this.deck.cards.pop());
    }

    setTimeout(() => { this.cards.forEach( (c) => { c.flip(); }); }, 200);
  }

  arrayNums(n) {
    return Array.from(Array(n), ( x, i ) => i );
  }

  rollCubes() {
    const allCubes = [this.numberCubes, this.operationCubes, this.relationCubes, this.colorCubes];
    for (const cubes of allCubes) {
      cubes.forEach((c) => {
      c.roll();
    });
    }
    if (this.settings.fix_rolls){
      let relCubes = this.relationCubes.toArray();
      setTimeout(() => {
      while ( relCubes[0].cube.face === relCubes[1].cube.face && relCubes[0].cube.face === relCubes[2].cube.face ) {
        this.relationCubes.forEach((c) => {
          c.rand();
        });
        relCubes = this.relationCubes.toArray();
      }
      }, 1200);
    }

  }

}

@Component({
  selector: 'app-settings-dialog',
  template: `
  <h1 mat-dialog-title>Settings</h1>
    <div mat-dialog-content>
      <div>
        <mat-slide-toggle [(ngModel)]="data.settings.elementary" >Elementary Mode?</mat-slide-toggle>
        </div><div>
        <mat-slide-toggle [(ngModel)]="data.settings.fix_rolls" >Fix Illegal Rolls?</mat-slide-toggle>
      </div>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">OK</button>
    </div>
  `,
})
export class SettingsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SettingsDialogData) {}

    onNoClick(): void {
      this.dialogRef.close(this.data.settings);
    }

}
