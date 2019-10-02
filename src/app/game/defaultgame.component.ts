import { GameComponent } from './game.component';
import { EquationsGameComponent } from './equationsgame.component';
import {
  Component,
} from '@angular/core';

import { Settings } from '../settings';
import { LocalstorageService } from '../storage/localstorage.service';


@Component({
  selector: 'app-defaultgame',
  template: `
  <app-game *ngIf="settings.game === 'onsets'"></app-game>
  <app-equationsgame *ngIf="settings.game === 'equations'"></app-equationsgame>
  `

})
export class DefaultGameComponent {
  title = 'default-game';
  settings: Settings;

  constructor(
    private storage: LocalstorageService
  ) {


    this.settings = storage.getSettings();
    console.log(this.settings)

}
}
