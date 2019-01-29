import { Component, OnInit } from '@angular/core';
import {CubeComponent} from '../cube.component';
import {Cube} from '../cube';

@Component({
  selector: 'app-operationcube',
  templateUrl: '../cube.component.html',
  styleUrls: ['./operationcube.component.scss']
})
export class OperationcubeComponent extends CubeComponent  {

  constructor() {
    super();
    this.cube = new Cube({
                  klass: 'operation',
                  faces: [
                  {klass: '', value: '—'},
                  {klass: '', value: '´'},
                  {klass: 'marker', value: '∪'},
                  {klass: 'marker', value: '∪'},
                  {klass: 'marker', value: '∩'},
                  {klass: 'marker', value: '∩'},
      ]});
  }


}
