import {Component, Input, OnInit} from '@angular/core';
import {CubeComponent} from '../cube.component';
import { Cube, IDENTIFIER, OPERATOR, MODIFIER } from '../cube';

@Component({
  selector: 'app-blackcube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./blackcube.component.scss'],
  host: {'class': 'cube'}
})
export class BlackcubeComponent extends CubeComponent  {
  private _elementary = false;

  get elementary(): boolean {
    return this._elementary;
  }

  @Input() set elementary(elementary: boolean) {
    this._elementary = elementary;
    this.set_faces();
  }

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
        klass: 'black',
      });
    }
    if (this.elementary) {
      if (this.cube.face > 1) { this.cube.face = 0; }
      this.cube.faces = [
                    {klass: '', value: '+', functions_as: OPERATOR},
                    {klass: '', value: '÷', functions_as: OPERATOR},
                   // {klass: '', value: '√', functions_as: MODIFIER},
                    {klass: '', value: '8', functions_as: IDENTIFIER},
                    {klass: '', value: '7', functions_as: IDENTIFIER},
                    {klass: 'marker', value: '9', functions_as: IDENTIFIER},
      ];
    } else {
      this.cube.faces = [
                    {klass: '', value: '+', functions_as: OPERATOR},
                    {klass: '', value: '÷', functions_as: OPERATOR},
                    {klass: '', value: '√', functions_as: MODIFIER},
                    {klass: '', value: '8', functions_as: IDENTIFIER},
                    {klass: '', value: '7', functions_as: IDENTIFIER},
                    {klass: 'marker', value: '9', functions_as: IDENTIFIER},
        ];
    }

  }

  constructor() {
    super();
    this.cube = new Cube({
        klass: 'black',
      });

    this.set_faces();
    this.rand();

    }



}
