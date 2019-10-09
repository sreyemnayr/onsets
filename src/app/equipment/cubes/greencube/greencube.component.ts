import {Component, Input, OnInit} from '@angular/core';
import {CubeComponent} from '../cube.component';
import { Cube, IDENTIFIER, OPERATOR, MODIFIER } from '../cube';

@Component({
  selector: 'app-greencube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./greencube.component.scss'],
  host: {'class': 'cube'}
})
export class GreencubeComponent extends CubeComponent  {
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
        klass: 'green',
      });
    }
    if (this.elementary) {
      if (this.cube.face > 4) { this.cube.face = 0; }
      this.cube.faces = [
                    {klass: '', label: '×', value: '*', functions_as: OPERATOR},
                    {klass: '', label: '−', value: '-', functions_as: OPERATOR},
                    // {klass: '', value: '∗', functions_as: MODIFIER},
                    {klass: '', value: '4', functions_as: IDENTIFIER},
                    {klass: '', value: '5', functions_as: IDENTIFIER},
                    {klass: 'marker', value: '6', functions_as: IDENTIFIER},
      ];
    } else {
      this.cube.faces = [
                    {klass: '', label: '×', value: '*', functions_as: OPERATOR},
                    {klass: '', label: '−', value: '-', functions_as: OPERATOR},
                    {klass: '', label: '∗', value: '^', functions_as: MODIFIER},
                    {klass: '', value: '4', functions_as: IDENTIFIER},
                    {klass: '', value: '5', functions_as: IDENTIFIER},
                    {klass: 'marker', value: '6', functions_as: IDENTIFIER},
        ];
    }

  }

  constructor() {
    super();
    this.cube = new Cube({
        klass: 'green',
      });

    this.set_faces();
    this.rand();

    }



}
