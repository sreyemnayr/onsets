export class Cube {
  sides: number;
  faces: Array<any>;
  face: number;
  selected: boolean;
  invert: boolean;
  position: any;
  klass: string;
  constructor({
                klass= 'traditional',
                sides= 6,
                faces= [
                  {klass: 'num', value: '1'},
                  {klass: 'num', value: '2'},
                  {klass: 'num', value: '3'},
                  {klass: 'num', value: '4'},
                  {klass: 'num', value: '5'},
                  {klass: 'num', value: '6'}
                  ],
                face= 0,
                selected= false,
                position= null
  }) {
    this.invert = false;
    this.klass = klass;
    this.sides = sides;
    this.faces = faces;
    this.face = face;
    this.selected = selected;
    this.position = position;
  }
}
