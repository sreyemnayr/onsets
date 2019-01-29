import { Component, OnInit } from '@angular/core';
import {CubeComponent} from '../cube.component';
import {Cube} from '../cube';

@Component({
  selector: 'app-numbercube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./numbercube.component.scss']
})
export class NumbercubeComponent extends CubeComponent  {

  constructor() {
    super();
    this.cube = new Cube({
                  klass: 'number',
                  faces: [
                  {klass: 'number', value: '1'},
                  {klass: 'number', value: '2'},
                  {klass: 'number', value: '3'},
                  {klass: 'number', value: '4'},
                  {klass: 'number', value: '5'},
                  {klass: 'number', value: '1'},
      ]});
  }



}
