import {Component, Input, OnInit} from '@angular/core';
import {CubeComponent} from '../cube.component';
import {Cube} from '../cube';

@Component({
  selector: 'app-relationcube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./relationcube.component.scss']
})
export class RelationcubeComponent extends CubeComponent  {
  private _elementary = false;

  get elementary(): boolean {
    return this._elementary;
  }

  @Input() set elementary(elementary: boolean) {
    this._elementary = elementary;
    this.set_faces();
  }

  set_faces() {
    if (!this.cube) {
      this.cube = new Cube({
        klass: 'relation',
      });
    }
    if (this.elementary) {
      if (this.cube.face > 1) { this.cube.face = 0; }
      this.cube.faces = [
                  {klass: 'marker', value: 'V'},
                  {klass: 'marker', value: 'Λ'},
      ];
    } else {
      this.cube.faces = [
                    {klass: '', value: '⊆'},
                    {klass: '', value: '⊆'},
                    {klass: '', value: '='},
                    {klass: '', value: '='},
                    {klass: 'marker', value: 'V'},
                    {klass: 'marker', value: 'Λ'},
        ];
    }

  }

  constructor() {
    super();
    this.cube = new Cube({
        klass: 'relation',
      });

    this.set_faces();
    this.rand();

    }



}
