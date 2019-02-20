export const OPERATOR = 1;
export const IDENTIFIER = 2;
export const MODIFIER = 3;
export const RESTRICTOR = 4;

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
                  {klass: 'num', value: '1', functions_as: IDENTIFIER},
                  {klass: 'num', value: '2', functions_as: IDENTIFIER},
                  {klass: 'num', value: '3', functions_as: IDENTIFIER},
                  {klass: 'num', value: '4', functions_as: IDENTIFIER},
                  {klass: 'num', value: '5', functions_as: IDENTIFIER},
                  {klass: 'num', value: '6', functions_as: IDENTIFIER}
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
