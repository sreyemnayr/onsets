import { Component, OnInit } from '@angular/core';
import {CubeComponent} from '../cube.component';
import { Cube, IDENTIFIER, MODIFIER, OPERATOR } from '../cube';

@Component({
  selector: 'app-operationcube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./operationcube.component.scss']
})
export class OperationcubeComponent extends CubeComponent  {

  constructor() {
    super();
    this.cube = new Cube({
                  klass: 'operation',
                  faces: [
                  {klass: '', value: '—', functions_as: OPERATOR},
                  {klass: '', value: '´', functions_as: MODIFIER},
                  {klass: 'marker', value: '∪', functions_as: OPERATOR},
                  {klass: 'marker', value: '∪', functions_as: OPERATOR},
                  {klass: 'marker', value: '∩', functions_as: OPERATOR},
                  {klass: 'marker', value: '∩', functions_as: OPERATOR},
      ]});
  }


}
