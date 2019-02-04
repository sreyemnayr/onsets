import { Component, OnInit, Input, Inject, InjectionToken } from '@angular/core';
import { Cube } from './cube';

export const CUBE = new InjectionToken<Cube>('cube', { providedIn: 'root',  factory: () => new Cube({}) } );

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {
  @Input() cube: Cube;

  constructor() {
   this.cube = this.cube || new Cube({});
  }

  rand() {
    this.cube.face = Math.floor(Math.random() * this.cube.faces.length);
  }

  roll() {
    let x = 0;
    const _this = this;
    const intervalID = setInterval(function () {
        _this.rand();
       if (++x === 15) {
           window.clearInterval(intervalID);
       }
    }, 10);
  }

  ngOnInit() {
  }

}
