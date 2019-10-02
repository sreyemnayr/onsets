
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
  selector: 'app-equationsgame',
  templateUrl: './equationsgame.component.html',
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
export class EquationsGameComponent implements OnInit {
  title = 'equations';

  dice_rotations: Array<string>;

  showSettings: boolean;
  showDice: boolean;
  goalSet: boolean;

  timer: TimerComponent;
  turnSeconds = 60;

  stage: number;
  settings: Settings;

  all_resources: Array<any>;
  goal_resources: Array<any>;
  forbidden_resources: Array<any>;
  permitted_resources: Array<any>;
  required_resources: Array<any>;
  solution_resources: Array<any>;
  restriction_resources: Array<any>;

  currentPlayer = 'player1';
  currentPlayerName = 'Player 1';
  currentPlayerInt = 0;

  playerStyles;
  playerIterator;

  inChallenge = false;
  inBonus = false;
  wasInBonus = false;

  goal: Array<number>;


  @ViewChildren(BlackcubeComponent) blackCubes: QueryList<any>;
  @ViewChildren(GreencubeComponent) grenCubes: QueryList<any>;
  @ViewChildren(RedcubeComponent) redCubes: QueryList<any>;
  @ViewChildren(BluecubeComponent) blueCubes: QueryList<any>;

  constructor(
    private ref: ChangeDetectorRef,
    public settingsDialog: MatDialog,
    public challengeDialog: MatDialog,
    private snackBar: MatSnackBar,
    private ps: PermutationsService,
    private sets: SetsService,
    private storage: LocalstorageService
  ) {


    this.goal_resources = [];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];
    this.solution_resources = [];
    this.restriction_resources = [];

    this.settings = storage.getSettings();


    this.all_resources = [
      new RedcubeComponent(),
      new RedcubeComponent(),
      new RedcubeComponent(),
      new RedcubeComponent(),
      new RedcubeComponent(),
      new RedcubeComponent(),

      new BluecubeComponent(),
      new BluecubeComponent(),
      new BluecubeComponent(),
      new BluecubeComponent(),
      new BluecubeComponent(),
      new BluecubeComponent(),

      new BlackcubeComponent(),
      new BlackcubeComponent(),
      new BlackcubeComponent(),
      new BlackcubeComponent(),
      new BlackcubeComponent(),
      new BlackcubeComponent(),

      new GreencubeComponent(),
      new GreencubeComponent(),
      new GreencubeComponent(),
      new GreencubeComponent(),
      new GreencubeComponent(),
      new GreencubeComponent(),

    ];


    this.mix();

    this.stage = 0;

    this.goalSet = false;

    this.showSettings = true;
    this.showDice = true;
    this.inChallenge = false;
    this.inBonus = false;
    this.wasInBonus = false;
    this.turnSeconds = 60;
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


  reconstruct() {


      this.all_resources = [
        new RedcubeComponent(),
        new RedcubeComponent(),
        new RedcubeComponent(),
        new RedcubeComponent(),
        new RedcubeComponent(),
        new RedcubeComponent(),

        new BluecubeComponent(),
        new BluecubeComponent(),
        new BluecubeComponent(),
        new BluecubeComponent(),
        new BluecubeComponent(),
        new BluecubeComponent(),

        new BlackcubeComponent(),
        new BlackcubeComponent(),
        new BlackcubeComponent(),
        new BlackcubeComponent(),
        new BlackcubeComponent(),
        new BlackcubeComponent(),

        new GreencubeComponent(),
        new GreencubeComponent(),
        new GreencubeComponent(),
        new GreencubeComponent(),
        new GreencubeComponent(),
        new GreencubeComponent(),


      // tslint:disable-next-line: semicolon
      ];

    this.mix();
    this.goal = [0];
    this.goal_resources.length = 0;
    this.goal_resources = [];
    this.forbidden_resources = [];
    this.permitted_resources = [];
    this.required_resources = [];
    this.solution_resources = [];
    this.restriction_resources = [];
    this.stage = 0;

    this.goalSet = false;
    this.inChallenge = false;
    this.inBonus = false;
    this.wasInBonus = false;
    this.turnSeconds = 60;

    for (const i of this.arrayNums(24)) {
      this.dice_rotations[i] = this.randomRotateDice();
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

    if (false && this.settings.fix_rolls) {  // Logic for fixing rolls in equations as of now unknown
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
        if (this.goalSet) {
          this.cyclePlayers();
        }
      }
    }
    this.goal = this.calculateGoal();
    // this.evaluate_solutions();
    // this.check_for_challenge();
  }

  checkPermutationValue(permutation: Array<any>): Set<any> {
    /*if (permutation.length === 2) {
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
    }*/
    return new Set(this.arrayNums(24));
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
            challenge_str = challenge ? 'true' : 'false';
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
    /*

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

    valid_equations.length = 0; */
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
    //const flipInt = Math.floor(Math.random() * 4) * 90;
    const flipInt = 0;
    const negInt = Math.floor(Math.random() * 2) === 0 ? 1 : -1;
    return 'rotate(' + (1 + baseInt + flipInt) * negInt + 'deg)';
  }

  calculateGoal() { // @todo fix to calculate goal from dice

    return [0];
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
    // const permutation = this.ps.hashCubes(this.solution_resources);
    // const perm_set = this.checkPermutationValue(permutation);
    // console.log(perm_set);
    /*if (perm_set.size === this.goal) {
      this.snackBar.open('Correct!');
    } else {
      this.snackBar.open('Incorrect!');
    }*/
    this.snackBar.open('Solution check not working yet');
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
            if (!this.goalSet) {
              setTimeout(() => {
                // this.goal_resources[3].push(this.number_resources.pop());
                this.goal_resources.push(this.all_resources.pop());
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

