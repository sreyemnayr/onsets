
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
  copyArrayItem,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import invert from 'invert-color';

import { Deck } from '../equipment/cards/deck';

import { NumbercubeComponent } from '../equipment/cubes/numbercube/numbercube.component';
import { ColorcubeComponent } from '../equipment/cubes/colorcube/colorcube.component';
import { RelationcubeComponent } from '../equipment/cubes/relationcube/relationcube.component';
import { OperationcubeComponent } from '../equipment/cubes/operationcube/operationcube.component';

import { GreencubeComponent } from './../equipment/cubes/greencube/greencube.component';
import { BlackcubeComponent } from './../equipment/cubes/blackcube/blackcube.component';
import { BluecubeComponent } from './../equipment/cubes/bluecube/bluecube.component';
import { RedcubeComponent } from './../equipment/cubes/redcube/redcube.component';

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

import { ChallengeDialogComponent } from './challengedialog.component';
import { SettingsDialogComponent } from './settingsdialog.component';



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
  card_rotations: Array<string>;
  dice_rotations: Array<string>;

  numCards: any;
  showSettings: boolean;
  showDice: boolean;
  goalSet: boolean;

  timer: TimerComponent;
  turnSeconds = 60;

  stage: number;
  settings: Settings;

  all_resources: Array<any>;
  number_resources: Array<any>;
  goal_resources: Array<any>;
  forbidden_resources: Array<any>;
  permitted_resources: Array<any>;
  required_resources: Array<any>;
  solution_resources: Array<any>;
  restriction_resources: Array<any>;

  canSetUniverse = false;

  currentPlayer = 'player1';
  currentPlayerName = 'Player 1';
  currentPlayerInt = 0;

  playerStyles;
  playerIterator;

  inChallenge = false;
  inBonus = false;
  wasInBonus = false;

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

    if (this.settings.dev_mode) {
      console.log('Blue', this.set_B.size);
      console.log('Red', this.set_R.size);
      console.log('Red u Blue', this.sets.union(this.set_R, this.set_B).size);
      console.log(
        'Red ∩ Blue',
        this.sets.intersection(this.set_R, this.set_B).size
      );
      console.log('Yellow', this.set_Y.size);
      console.log('Green', this.set_G.size);
      console.log(
        'Green u Yellow',
        this.sets.union(this.set_G, this.set_Y).size
      );
      console.log(
        'Green ∩ Yellow',
        this.sets.intersection(this.set_G, this.set_Y).size
      );
    }

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
    public challengeDialog: MatDialog,
    private snackBar: MatSnackBar,
    private ps: PermutationsService,
    private sets: SetsService,
    private storage: LocalstorageService
  ) {


    this.goal_resources = [[], [], [], [], [], []];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];
    this.solution_resources = [];
    this.restriction_resources = [];

    this.settings = storage.getSettings();



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
    this.inChallenge = false;
    this.inBonus = false;
    this.wasInBonus = false;
    this.turnSeconds = 60;
    this.card_rotations = [];
    this.dice_rotations = [];
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
      this.settings = this.storage.saveSettings(result);
      this.setPlayerColors();
      this.playerIterator = this.nextPlayer();
    });
  }

  openChallenge(challenge: string): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { challenge: challenge };
    const dialogRef = this.challengeDialog.open(
      ChallengeDialogComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe(result => {
      this.reconstruct();
      this.cyclePlayers();
      this.rollCubes();
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
    this.goal = 0;
    this.goal_resources.length = 0;
    this.goal_resources = [[], [], [], [], [], []];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];
    this.solution_resources = [];
    this.restriction_resources = [];
    this.stage = 0;
    this.universeSet = false;
    this.canSetUniverse = false;
    this.goalSet = false;
    this.universe = [];
    this.deck = new Deck();
    this.deck.shuffle();
    this.inChallenge = false;
    this.inBonus = false;
    this.wasInBonus = false;
    this.turnSeconds = 60;

    for (const i of this.arrayNums(15)) {
      this.card_rotations[i] = this.randomRotate();
      this.dice_rotations[i] = this.randomRotateDice();
    }

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
      console.log(event.container.id);
      if (
        event.container.id === 'solutionList' ||
        event.container.id === 'restrictionList'
      ) {
        copyArrayItem(
          event.previousContainer.data,
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
    }
    this.goal = this.calculateGoal();
    // this.evaluate_solutions();
    // this.check_for_challenge();
  }

  checkPermutationValue(permutation: Array<any>): Set<any> {
    if (permutation.length === 2) {
      if (permutation[1] === FACES.COMPLEMENT) {
        return this.sets.difference(this.set_V, this.card_sets[permutation[0]]);
      }
    }
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

  check_for_challenge() {
    const resources = this.permitted_resources.concat(this.required_resources);
    const required = this.required_resources;
    let challenge_str = '';
    let cont = true;

    this.all_resources.forEach(async (r, i) => {
      if (cont === true) {
        const challenge = await this.evaluate_solutions(
          resources.concat([r]),
          required,
          true
        );
        if (cont) {
          if (challenge) {
            challenge_str = challenge;
            cont = false;
            this.inChallenge = true;
            this.openChallenge(challenge_str);
          }
        }
      }
    });
    console.log(cont);
    if (!cont) {
      return true;
    }
    return false;
  }

  async evaluate_solutions(
    available_resources: any = false,
    required_resources: any = false,
    return_challenge = true
  ) {
    // console.time('test');

    const valid_equations = [];
    if (!available_resources) {
      available_resources = this.permitted_resources.concat(
        this.required_resources
      );
    }
    if (!required_resources) {
      required_resources = this.required_resources;
    }

    const resources = this.ps.hashCubes(available_resources);
    const required = this.ps.hashCubes(required_resources);

    for (let i = 2; i <= resources.length; i++) {
      for (const c of await this.ps.combine(resources, i)) {
        if (this.ps.checkValidCombo(c, required)) {
          for (const permutation of await this.ps.permute(c)) {
            if (this.checkPermutationValue(permutation).size === this.goal) {
              let s = '';
              for (const p of permutation) {
                s += ' ' + this.ps.hash_to_string(p);
              }
              if (return_challenge) {
                return s;
              }
              valid_equations.push(s);
            }
          }
        }
      }
    }

    valid_equations.length = 0;
    return false;
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

  randomRotate() {
    const baseInt = Math.floor(Math.random() * 6);
    const flipInt = Math.floor(Math.random() * 2) * 180;
    const negInt = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
    return 'rotate(' + (1 + baseInt + flipInt) * negInt + 'deg)';
  }

  randomRotateDice() {
    const baseInt = Math.floor(Math.random() * 8);
    const flipInt = Math.floor(Math.random() * 4) * 90;
    const negInt = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
    return 'rotate(' + (1 + baseInt + flipInt) * negInt + 'deg)';
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
    const css = `
    .player1 .mat-progress-bar-fill::after { background-color: ${
      this.settings.player_colors[0]
    } !important; }
    .player2 .mat-progress-bar-fill::after { background-color: ${
      this.settings.player_colors[1]
    } !important; }
    .player3 .mat-progress-bar-fill::after { background-color: ${
      this.settings.player_colors[2]
    } !important; }
    .player1 .mat-progress-bar-buffer { background-color: ${invert(
      this.settings.player_colors[0]
    )} !important; }
    .player2 .mat-progress-bar-buffer { background-color: ${invert(
      this.settings.player_colors[1]
    )} !important; }
    .player3 .mat-progress-bar-buffer { background-color: ${invert(
      this.settings.player_colors[2]
    )} !important; }
    .player1 .mat-chip { color: ${invert(
      this.settings.player_colors[0]
    )} !important; background-color: ${
      this.settings.player_colors[0]
    } !important; }
    .player2 .mat-chip { color: ${invert(
      this.settings.player_colors[1]
    )} !important; background-color: ${
      this.settings.player_colors[1]
    } !important;}
    .player3 .mat-chip { color: ${invert(
      this.settings.player_colors[2]
    )} !important; background-color: ${
      this.settings.player_colors[2]
    } !important;}
    .player1 { color: ${invert(this.settings.player_colors[0])} !important; }
    .player2 { color: ${invert(this.settings.player_colors[1])} !important; }
    .player3 { color: ${invert(this.settings.player_colors[2])} !important; }
    .player1 .mat-badge-content { color: ${invert(
      this.settings.player_colors[0]
    )} !important; background-color: ${
      this.settings.player_colors[0]
    } !important; }
    .player2  .mat-badge-content { color: ${invert(
      this.settings.player_colors[1]
    )} !important; background-color: ${
      this.settings.player_colors[1]
    } !important;}
    .player3 .mat-badge-content { color: ${invert(
      this.settings.player_colors[2]
    )} !important; background-color: ${
      this.settings.player_colors[2]
    } !important;}
    `;
    const head = document.getElementsByTagName('head')[0];
    // const styletag = document.createElement('style');
    this.playerStyles.innerHTML = '';
    this.playerStyles.type = 'text/css';
    this.playerStyles.appendChild(document.createTextNode(css));

    head.appendChild(this.playerStyles);
  }

  checkSolution() {
    const permutation = this.ps.hashCubes(this.solution_resources);
    const perm_set = this.checkPermutationValue(permutation);
    console.log(perm_set);
    if (perm_set.size === this.goal) {
      this.snackBar.open('Correct!');
    } else {
      this.snackBar.open('Incorrect!');
    }
  }

  cyclePlayers() {
    if (this.all_resources.length <= 1) {
      this.inChallenge = true;
      this.turnSeconds = 120;
    }
    if (!this.inBonus) {
      this.wasInBonus = false;
      if (!this.inChallenge) {
        const player = this.playerIterator.next();
        if (!this.settings.player_human[player.value]) {
          const challenge_check = this.check_for_challenge();
          if (!challenge_check) {
            if (!this.universeSet) {
              setTimeout(() => {
                this.add_card();

                setTimeout(() => {
                  this.add_card();
                  this.universeSet = true;
                }, 1000);
              }, 1000);
            } else if (this.universeSet && !this.goalSet) {
              setTimeout(() => {
                // this.goal_resources[3].push(this.number_resources.pop());
                this.goal_resources[4].push(this.number_resources.pop());
                this.goal = this.calculateGoal();
                this.goalSet = true;
                this.cyclePlayers();
                this.snackBar.open('Goal Set!');
              }, 3000);
            } else {
              setTimeout(() => {
                switch (Math.floor(Math.random() * 16)) {
                  case 0:
                    this.forbidden_resources.push(this.all_resources.pop());
                    break;
                  case 1:
                    this.required_resources.push(this.all_resources.pop());
                    break;
                  default:
                    this.permitted_resources.push(this.all_resources.pop());
                }

                this.cyclePlayers();
              }, 1200);
            }
          }
        }
      }
    } else {
      this.inBonus = false;
    }
    // this.timer.startTimer();
  }

  *nextPlayer() {
    while (true) {
      for (const n of this.arrayNums(this.settings.num_players)) {
        this.currentPlayer = `player${n + 1}`;
        this.currentPlayerName = this.settings.player_names[n];
        this.currentPlayerInt = n;
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

