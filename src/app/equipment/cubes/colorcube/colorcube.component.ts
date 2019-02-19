import { Component, OnInit } from '@angular/core';
import { Cube, IDENTIFIER } from '../cube';
import {CubeComponent} from '../cube.component';

@Component({
  selector: 'app-colorcube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./colorcube.component.scss']
})
export class ColorcubeComponent extends CubeComponent  {
  cube: Cube;

  constructor() {
    super();
    this.cube = new Cube({
                  klass: 'color',
                  faces: [
                  {klass: 'circle red', value: 'R', functions_as: IDENTIFIER},
                  {klass: 'circle red', value: 'R', functions_as: IDENTIFIER},
                  {klass: 'circle blue', value: 'B', functions_as: IDENTIFIER},
                  {klass: 'circle blue', value: 'B', functions_as: IDENTIFIER},
                  {klass: 'circle green', value: 'G', functions_as: IDENTIFIER},
                  {klass: 'circle yellow', value: 'Y', functions_as: IDENTIFIER},
      ]});
  }



}
