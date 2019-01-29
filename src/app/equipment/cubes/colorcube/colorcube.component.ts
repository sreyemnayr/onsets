import { Component, OnInit } from '@angular/core';
import { Cube } from '../cube';
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
                  {klass: 'circle red', value: ''},
                  {klass: 'circle red', value: ''},
                  {klass: 'circle blue', value: ''},
                  {klass: 'circle blue', value: ''},
                  {klass: 'circle green', value: ''},
                  {klass: 'circle yellow', value: ''},
      ]});
  }



}
