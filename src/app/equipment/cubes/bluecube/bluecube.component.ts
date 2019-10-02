import {Component, Input, OnInit} from '@angular/core';
import {CubeComponent} from '../cube.component';
import { Cube, IDENTIFIER, OPERATOR, MODIFIER } from '../cube';

@Component({
  selector: 'app-bluecube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./bluecube.component.scss'],
  host: {'class': 'cube'}
})
export class BluecubeComponent extends CubeComponent  {
 
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
        klass: 'blue',
      });
    }
    this.cube.faces = [
                  {klass: '', value: '×', functions_as: OPERATOR},
                  {klass: '', value: '÷', functions_as: OPERATOR},
                  {klass: '', value: '0', functions_as: IDENTIFIER},
                  {klass: '', value: '1', functions_as: IDENTIFIER},
                  {klass: '', value: '2', functions_as: IDENTIFIER},
                  {klass: '', value: '3', functions_as: IDENTIFIER},
      ];

  }

  constructor() {
    super();
    this.cube = new Cube({
        klass: 'blue',
      });

    this.set_faces();
    this.rand();

    }



}
