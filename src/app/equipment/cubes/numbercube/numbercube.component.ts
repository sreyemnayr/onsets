import { Component, OnInit } from '@angular/core';
import {CubeComponent} from '../cube.component';
import { Cube, IDENTIFIER } from '../cube';

@Component({
  selector: 'app-numbercube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./numbercube.component.scss']
})
export class NumbercubeComponent extends CubeComponent  {

  handle_doubleclick() {
    this.cube.invert = !this.cube.invert;
  }

  constructor() {
    super();
    this.cube = new Cube({
                  klass: 'number',
                  faces: [
                  {klass: 'number', value: '1', functions_as: IDENTIFIER},
                  {klass: 'number', value: '2', functions_as: IDENTIFIER},
                  {klass: 'number', value: '3', functions_as: IDENTIFIER},
                  {klass: 'number', value: '4', functions_as: IDENTIFIER},
                  {klass: 'number', value: '5', functions_as: IDENTIFIER},
                  {klass: 'number', value: '1', functions_as: IDENTIFIER},
      ]});
  }



}
