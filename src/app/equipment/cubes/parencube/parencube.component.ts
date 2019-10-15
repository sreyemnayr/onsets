import { Component, OnInit } from '@angular/core';
import { Cube, PUNCTUATION } from '../cube';
import {CubeComponent} from '../cube.component';

@Component({
  selector: 'app-parencube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./parencube.component.scss'],

})
export class ParencubeComponent extends CubeComponent  {
  cube: Cube;

  constructor() {
    super();
    this.cube = new Cube({
                  klass: 'paren',
                  faces: [
                  {klass: 'paren', value: '(', functions_as: PUNCTUATION},
                  {klass: 'paren', value: ')', functions_as: PUNCTUATION},
                  {klass: 'paren', value: '_', label: ' ', functions_as: PUNCTUATION},

      ]});
  }



}
