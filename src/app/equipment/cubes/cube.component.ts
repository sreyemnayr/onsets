import { Component, OnInit, Input } from '@angular/core';
import { Cube } from './cube';

@Component({
  selector: 'app-cube',
  templateUrl: './cube.component.html',
  styleUrls: ['./cube.component.scss']
})
export class CubeComponent implements OnInit {
  @Input() cube: Cube;

  constructor() {
    if (!this.cube) {
      this.cube = new Cube({});
    }
  }

  rand() {
    this.cube.face = Math.floor(Math.random() * this.cube.faces.length);
  }

  roll() {
    let x = 0;
    const _this = this;
    const intervalID = setInterval(function () {
        _this.rand();
       if (++x === 30) {
           window.clearInterval(intervalID);
       }
    }, 10);
  }

  ngOnInit() {
    this.roll();
  }

}
