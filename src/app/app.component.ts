import {
  Component,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  Inject,
  ReflectiveInjector,
  Injector, Input,
} from '@angular/core';

import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
import { CUBE } from './equipment/cubes/cube.component';
import { Cube } from './equipment/cubes/cube';

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

  stage: number;
  settings: Settings;

  all_resources: Array<any>;
  number_resources: Array<any>;
  goal_resources: Array<any>;
  forbidden_resources: Array<any>;
  permitted_resources: Array<any>;
  required_resources: Array<any>;

  private _universeSet = false;

  get universeSet(): boolean {
    return this._universeSet;
  }

  @Input() set universeSet(universeSet: boolean) {
    this._universeSet = universeSet;
    this.rollCubes();
  }

  @ViewChildren(ColorcubeComponent) colorCubes: QueryList<any>;
  @ViewChildren(RelationcubeComponent) relationCubes: QueryList<any>;
  @ViewChildren(OperationcubeComponent) operationCubes: QueryList<any>;
  @ViewChildren(NumbercubeComponent) numberCubes: QueryList<any>;
  @ViewChildren(CardComponent) cards: QueryList<any>;

  constructor(private ref: ChangeDetectorRef, public settingsDialog: MatDialog, ) {
    this.all_resources = [
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new RelationcubeComponent(),
      new RelationcubeComponent(),
      new RelationcubeComponent(),
      new OperationcubeComponent(),
      new OperationcubeComponent(),
      new OperationcubeComponent(),
      new OperationcubeComponent(),

    ];
    this.number_resources = [new NumbercubeComponent(),
      new NumbercubeComponent(),
      new NumbercubeComponent(), ];
    this.mix();

    this.goal_resources = [[], [], [], [], [], []];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];
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
    this.all_resources = [
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new ColorcubeComponent(),
      new RelationcubeComponent(),
      new RelationcubeComponent(),
      new RelationcubeComponent(),
      new OperationcubeComponent(),
      new OperationcubeComponent(),
      new OperationcubeComponent(),
      new OperationcubeComponent(),

    ];
    this.number_resources = [new NumbercubeComponent(),
      new NumbercubeComponent(),
      new NumbercubeComponent(), ];
    this.mix();

    this.goal_resources = [[], [], [], [], [], []];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];
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

    for (const cube of this.all_resources) {
      cube.roll();
    }
    for (const cube of this.number_resources) {
      cube.roll();
    }
    if (this.settings.fix_rolls) {
      let relation_cubes = 0;
      const relation_faces = [0, 0, 0];
      setTimeout(() => {
        for ( const cube of this.all_resources ) {
          if ( cube.constructor.name === 'RelationcubeComponent' ) {

            relation_faces[relation_cubes] = cube.cube.face;
            relation_cubes++;
            if ( relation_cubes > 2 ) {
              if ( relation_faces[0] === relation_faces[1] ) {
                while(relation_faces[0] === cube.cube.face) {
                  cube.rand();

                }
              }
            }


          }
        }
      }, 1400);
    }
    /*const allCubes = [this.numberCubes, this.operationCubes, this.relationCubes, this.colorCubes];
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
    }*/

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  mix() {
    let currentIndex = this.all_resources.length;
    let temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.all_resources[currentIndex];
      this.all_resources[currentIndex] = this.all_resources[randomIndex];
      this.all_resources[randomIndex] = temporaryValue;
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
