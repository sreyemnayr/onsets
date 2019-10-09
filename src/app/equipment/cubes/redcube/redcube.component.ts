import {Component, Input, OnInit} from '@angular/core';
import {CubeComponent} from '../cube.component';
import { Cube, IDENTIFIER, OPERATOR } from '../cube';

@Component({
  selector: 'app-redcube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./redcube.component.scss'],
  host: {'class': 'cube'}
})
export class RedcubeComponent extends CubeComponent  {

  handle_doubleclick() {
    if (!this.cube.rotate) {
      this.cube.rotate = !this.cube.rotate;
    } else {
      this.cube.rotate = !this.cube.rotate;
      this.cube.invert = !this.cube.invert;
    }

  }

  set_faces() {
    if (!this.cube) {
      this.cube = new Cube({
        klass: 'red',
      });
    }

    this.cube.faces = [
                  {klass: '', label: '+', value: '+', functions_as: OPERATOR},
                  {klass: '', label: '−', value: '-', functions_as: OPERATOR},
                  {klass: '', value: '0', functions_as: IDENTIFIER},
                  {klass: '', value: '1', functions_as: IDENTIFIER},
                  {klass: '', value: '2', functions_as: IDENTIFIER},
                  {klass: '', value: '3', functions_as: IDENTIFIER},
      ];

  }

  constructor() {
    super();
    this.cube = new Cube({
        klass: 'red',
      });

    this.set_faces();
    this.rand();

    }



}
