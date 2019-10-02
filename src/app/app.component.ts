import {
  Component,
} from '@angular/core';

import { Settings } from './settings';
import { LocalstorageService } from './storage/localstorage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  title = 'onsets';
  settings: Settings;

  constructor(
    private storage: LocalstorageService
  ) {


    this.settings = storage.getSettings();
    console.log(this.settings)

}
}
