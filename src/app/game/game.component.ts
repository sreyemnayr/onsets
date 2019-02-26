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
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { Deck } from '../equipment/cards/deck';

import { NumbercubeComponent } from '../equipment/cubes/numbercube/numbercube.component';
import { ColorcubeComponent } from '../equipment/cubes/colorcube/colorcube.component';
import { RelationcubeComponent } from '../equipment/cubes/relationcube/relationcube.component';
import { OperationcubeComponent } from '../equipment/cubes/operationcube/operationcube.component';
import { Card } from '../equipment/cards/card/card';
import { Settings } from '../settings';

import { LocalstorageService } from '../storage/localstorage.service';

import {
  trigger,
  style,
  transition,
  animate,
  group
} from '@angular/animations';
import { CardComponent } from '../equipment/cards/card/card.component';
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
import { FormControl } from '@angular/forms';
import { CUBE } from '../equipment/cubes/cube.component';
import { Cube } from '../equipment/cubes/cube';
import { FACES, PermutationsService } from '../algorithms/permutations.service';
import { SetsService } from '../algorithms/sets.service';

import { TimerComponent } from '../timer/timer.component';

export interface SettingsDialogData {
  settings: Settings;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate(300)
      ]),
      transition(':leave', [
        group([
          animate(
            '0.2s 0.1s ease',
            style({
              opacity: 0
            })
          )
        ])
      ])
    ])
  ]
})
export class GameComponent implements OnInit {
  title = 'onsets';
  displayCards: number;
  deck: any;
  universe: Array<Card>;
  set_R: Set<number>;
  set_B: Set<number>;
  set_G: Set<number>;
  set_Y: Set<number>;
  set_V: Set<number>;
  not_R: Set<number>;
  not_B: Set<number>;
  not_G: Set<number>;
  not_Y: Set<number>;
  not_V: Set<number>;
  card_sets: Array<Set<number>>;

  numCards: any;
  showSettings: boolean;
  showDice: boolean;
  goalSet: boolean;

  timer: TimerComponent;

  stage: number;
  settings: Settings;

  all_resources: Array<any>;
  number_resources: Array<any>;
  goal_resources: Array<any>;
  forbidden_resources: Array<any>;
  permitted_resources: Array<any>;
  required_resources: Array<any>;

  canSetUniverse = false;

  currentPlayer = 'player1';
  currentPlayerName = 'Player 1';

  playerStyles;
  playerIterator;

  goal: number;

  private _universeSet = false;

  get universeSet(): boolean {
    return this._universeSet;
  }

  @Input() set universeSet(universeSet: boolean) {
    this._universeSet = universeSet;
    this.set_R.clear();
    this.set_B.clear();
    this.set_G.clear();
    this.set_Y.clear();
    this.set_V.clear();
    this.not_R.clear();
    this.not_B.clear();
    this.not_G.clear();
    this.not_Y.clear();
    this.not_V.clear();
    this.card_sets.length = 0;

    this.universe.forEach((c, i) => {
      if (c.red) {
        this.set_R.add(i);
      } else {
        this.not_R.add(i);
      }
      if (c.blue) {
        this.set_B.add(i);
      } else {
        this.not_B.add(i);
      }
      if (c.yellow) {
        this.set_Y.add(i);
      } else {
        this.not_Y.add(i);
      }
      if (c.green) {
        this.set_G.add(i);
      } else {
        this.not_G.add(i);
      }
      this.set_V.add(i);
    });
    this.card_sets[FACES.R] = this.set_R;
    this.card_sets[FACES.B] = this.set_B;
    this.card_sets[FACES.Y] = this.set_Y;
    this.card_sets[FACES.G] = this.set_G;
    this.card_sets[FACES.UNIVERSE] = this.set_V;
    this.card_sets[FACES.EMPTY] = this.not_V;

    console.log('Blue', this.set_B.size);
    console.log('Red', this.set_R.size);
    console.log('Red u Blue', this.sets.union(this.set_R, this.set_B).size);
    console.log(
      'Red ∩ Blue',
      this.sets.intersection(this.set_R, this.set_B).size
    );
    console.log('Yellow', this.set_Y.size);
    console.log('Green', this.set_G.size);
    console.log('Green u Yellow', this.sets.union(this.set_G, this.set_Y).size);
    console.log(
      'Green ∩ Yellow',
      this.sets.intersection(this.set_G, this.set_Y).size
    );

    this.rollCubes();
    if (this._universeSet) {
      this.cyclePlayers();
    }
  }

  @ViewChildren(ColorcubeComponent) colorCubes: QueryList<any>;
  @ViewChildren(RelationcubeComponent) relationCubes: QueryList<any>;
  @ViewChildren(OperationcubeComponent) operationCubes: QueryList<any>;
  @ViewChildren(NumbercubeComponent) numberCubes: QueryList<any>;
  @ViewChildren(CardComponent) cards: QueryList<any>;

  constructor(
    private ref: ChangeDetectorRef,
    public settingsDialog: MatDialog,
    private snackBar: MatSnackBar,
    private ps: PermutationsService,
    private sets: SetsService,
    private storage: LocalstorageService
  ) {
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
      new OperationcubeComponent()
    ];
    this.number_resources = [
      new NumbercubeComponent(),
      new NumbercubeComponent(),
      new NumbercubeComponent()
    ];
    this.mix();

    this.goal_resources = [[], [], [], [], [], []];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];

    this.settings = storage.getSettings();

    this.stage = 0;

    this.goalSet = false;
    this.universe = [];
    this.set_R = new Set();
    this.set_B = new Set();
    this.set_Y = new Set();
    this.set_G = new Set();
    this.set_V = new Set();
    this.not_R = new Set();
    this.not_B = new Set();
    this.not_Y = new Set();
    this.not_G = new Set();
    this.not_V = new Set();
    this.card_sets = [];
    this.universeSet = false;
    this.displayCards = 6;
    this.showSettings = true;
    this.showDice = true;
    this.reconstruct();
  }

  openSettings(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { settings: this.settings };
    const dialogRef = this.settingsDialog.open(
      SettingsDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.settings = this.storage.saveSettings(result);
      this.setPlayerColors();
      this.playerIterator = this.nextPlayer();
    });
  }

  add_card() {
    this.universe.push(this.deck.cards.pop());
    setTimeout(() => {
      this.cards.forEach(c => {
        c.flip();
      });
    }, 200);
    if (this.settings.elementary) {
      if (this.universe.length >= 6) {
        this.canSetUniverse = true;
      }
      if (this.universe.length >= 12) {
        this.universeSet = true;
      }
    } else {
      if (this.universe.length >= 10) {
        this.canSetUniverse = true;
      }
      if (this.universe.length >= 14) {
        this.universeSet = true;
      }
    }
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
      new OperationcubeComponent()
    ];
    this.number_resources = [
      new NumbercubeComponent(),
      new NumbercubeComponent(),
      new NumbercubeComponent()
    ];
    this.mix();

    this.goal_resources = [[], [], [], [], [], []];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];
    this.stage = 0;
    this.universeSet = false;
    this.canSetUniverse = false;
    this.goalSet = false;
    this.universe = [];
    this.deck = new Deck();
    this.deck.shuffle();

    if (this.settings.auto_deal_minimum) {
      const minimum_cards = this.settings.elementary ? 6 : 10;
      // for (const i of this.arrayNums(minimum_cards))
      this.arrayNums(minimum_cards).forEach(() => {
        this.add_card();
      });
    }
  }

  arrayNums(n) {
    return Array.from(Array(n), (x, i) => i);
  }

  rollCubes() {
    this.mix();

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
        for (const cube of this.all_resources) {
          if (cube.constructor.name === 'RelationcubeComponent') {
            relation_faces[relation_cubes] = cube.cube.face;
            relation_cubes++;
            if (relation_cubes > 2) {
              if (relation_faces[0] === relation_faces[1]) {
                while (relation_faces[0] === cube.cube.face) {
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
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      if (this.goalSet && this.universeSet) {
        this.cyclePlayers();
      }
    }
    this.goal = this.calculateGoal();
    // this.evaluate_solutions();
  }

  checkPermutationValue(permutation: Array<any>): Set<any> {
    if (permutation.length === 3) {
      if (permutation[1] === FACES.UNION) {
        return this.sets.union(
          this.card_sets[permutation[0]],
          this.card_sets[permutation[2]]
        );
      }
      if (permutation[1] === FACES.INTERSECT) {
        return this.sets.intersection(
          this.card_sets[permutation[0]],
          this.card_sets[permutation[2]]
        );
      }
    }
    if (permutation.length === 4) {
      if (permutation[1] === FACES.COMPLEMENT) {
        if (permutation[2] === FACES.UNION) {
          return this.sets.union(
            this.sets.difference(this.set_V, this.card_sets[permutation[0]]),
            this.card_sets[permutation[3]]
          );
        }
        if (permutation[2] === FACES.INTERSECT) {
          return this.sets.intersection(
            this.sets.difference(this.set_V, this.card_sets[permutation[0]]),
            this.card_sets[permutation[3]]
          );
        }
        if (permutation[2] === FACES.DIFFERENCE) {
          return this.sets.difference(
            this.sets.difference(this.set_V, this.card_sets[permutation[0]]),
            this.card_sets[permutation[3]]
          );
        }
      }
      if (permutation[3] === FACES.COMPLEMENT) {
        if (permutation[1] === FACES.UNION) {
          return this.sets.union(
            this.card_sets[permutation[0]],
            this.sets.difference(this.set_V, this.card_sets[permutation[2]])
          );
        }
        if (permutation[1] === FACES.INTERSECT) {
          return this.sets.intersection(
            this.card_sets[permutation[0]],
            this.sets.difference(this.set_V, this.card_sets[permutation[2]])
          );
        }
        if (permutation[1] === FACES.DIFFERENCE) {
          return this.sets.difference(
            this.card_sets[permutation[0]],
            this.sets.difference(this.set_V, this.card_sets[permutation[2]])
          );
        }
      }
    }
    return new Set(this.arrayNums(17));
  }

  async evaluate_solutions() {
    // console.time('test');

    const valid_equations = [];

    const resources = this.ps.hashCubes(
      this.permitted_resources.concat(this.required_resources)
    );
    const required = this.ps.hashCubes(this.required_resources);
    console.log('Required: ', required);
    for (let i = 2; i <= resources.length; i++) {
      for (const c of await this.ps.combine(resources, i)) {
        if (this.ps.checkValidCombo(c, required)) {
          for (const permutation of await this.ps.permute(c)) {
            if (this.checkPermutationValue(permutation).size === this.goal) {
              let s = '';
              for (const p of permutation) {
                s += ' ' + this.ps.hash_to_string(p);
              }
              valid_equations.push(s);
            }
          }
        }
      }
      // console.log(combos);
    }
    // console.timeEnd('test');
    console.log(valid_equations);
    valid_equations.length = 0;
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

  calculateValue(cubeArray: Array<any>, number = 0) {
    if (cubeArray.length > 0) {
      const c = cubeArray[0].cube;
      if (c.invert) {
        return parseInt(c.faces[c.face]['value'], 10) * -1;
      } else {
        return parseInt(c.faces[c.face]['value'], 10);
      }
    } else {
      return number;
    }
  }

  calculateGoal() {
    const a = this.calculateValue(this.goal_resources[0], 1);
    const b = this.calculateValue(this.goal_resources[1], 1);
    const c = this.calculateValue(this.goal_resources[2], 1);
    const d = this.calculateValue(this.goal_resources[3], 0);
    const e = this.calculateValue(this.goal_resources[4], 0);
    const f = this.calculateValue(this.goal_resources[5], 0);

    return a * b * d + c * (e + f);
  }

  setPlayerColors() {
    const css1 =
      '.player1 .mat-progress-bar-fill::after {\n' +
      '    background-color: ' +
      this.settings.player_colors[0] +
      ' !important;\n' +
      '}';
    const css2 =
      '.player2 .mat-progress-bar-fill::after {\n' +
      '    background-color: ' +
      this.settings.player_colors[1] +
      ' !important;\n' +
      '}';
    const css3 =
      '.player3 .mat-progress-bar-fill::after {\n' +
      '    background-color: ' +
      this.settings.player_colors[2] +
      ' !important;\n' +
      '}';
    const head = document.getElementsByTagName('head')[0];
    // const styletag = document.createElement('style');
    this.playerStyles.innerHTML = '';
    this.playerStyles.type = 'text/css';
    this.playerStyles.appendChild(document.createTextNode(css1));
    this.playerStyles.appendChild(document.createTextNode(css2));
    this.playerStyles.appendChild(document.createTextNode(css3));
    head.appendChild(this.playerStyles);
  }

  cyclePlayers() {
    const _ = this.playerIterator.next();
    // this.timer.startTimer();
  }

  *nextPlayer() {
    while (true) {
      for (const n of this.arrayNums(this.settings.num_players)) {
        this.currentPlayer = `player${n + 1}`;
        this.currentPlayerName = this.settings.player_names[n];
        yield n;
      }
    }
  }

  ngOnInit() {
    this.playerStyles = document.createElement('style');
    this.setPlayerColors();
    this.playerIterator = this.nextPlayer();
    this.playerIterator.next();
  }
}

@Component({
  selector: 'app-settings-dialog',
  template: `
    <ng-template #human><mat-icon>person</mat-icon></ng-template
    ><ng-template #cpu><mat-icon>android</mat-icon></ng-template>
    <h1 mat-dialog-title>Settings</h1>
    <div mat-dialog-content>
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
