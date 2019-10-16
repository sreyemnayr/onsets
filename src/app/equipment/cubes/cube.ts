export const OPERATOR = 1;
export const IDENTIFIER = 2;
export const MODIFIER = 3;
export const RESTRICTOR = 4;
export const PUNCTUATION = 5;

interface CubeFaceInterface {
  klass?: string;
  value?: string;
  label?: string;
  functions_as?: number;
  inverse_value?: string;
  rotated_value?: string;
}
export class CubeFace {
  klass?: string;
  value?: string;
  label?: string;
  functions_as?: number;
  inverse_value?: string;
  rotated_value?: string;
  constructor(config: CubeFaceInterface) {
    this.klass = config.klass || 'num';
    this.value = config.value || '1';
    this.label = config.label || this.value;
    this.functions_as = config.functions_as || IDENTIFIER;
    this.inverse_value = config.inverse_value || (
        this.functions_as === IDENTIFIER ? (parseInt(this.value, 10) * -1).toString() : this.value
        );
    this.rotated_value = config.rotated_value || (
        this.functions_as === IDENTIFIER ? (`(1/${parseInt(this.value, 10)})`) : this.value
      );
  }
}

export class Cube {
  sides: number;
  faces: Array<CubeFace>;
  face: number;
  selected: boolean;
  invert: boolean;
  position: any;
  rotate: boolean;
  klass: string;
  get value(): string {
    return this.rotate ?
      this.faces[this.face].rotated_value :
    this.invert ?
      this.faces[this.face].inverse_value :
      this.faces[this.face].value;
  }
  get functions_as(): number {
    return this.faces[this.face].functions_as
  }
  constructor({
                klass= 'traditional',
                sides= 6,
                faces= [
                  new CubeFace({value: '1'}),
                  new CubeFace({value: '2'}),
                  new CubeFace({value: '3'}),
                  new CubeFace({value: '4'}),
                  new CubeFace({value: '5'}),
                  new CubeFace({value: '6'}),
                  ],
                face= 0,
                selected= false,
                position= null,
                rotate= false,
  }) {
    this.invert = false;
    this.klass = klass;
    this.sides = sides;
    this.faces = faces.map( f => f instanceof CubeFace ? f : new CubeFace(f) );
    this.face = face;
    this.selected = selected;
    this.position = position;
    this.rotate = rotate;
  }
}
