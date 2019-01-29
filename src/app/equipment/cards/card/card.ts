export class Card {
  blue: boolean;
  red: boolean;
  green: boolean;
  yellow: boolean;
  get set() {
    const _set = new Set();
    if (this.blue) { _set.add('B'); }
    if (this.red) { _set.add('R'); }
    if (this.green) { _set.add('G'); }
    if (this.yellow) { _set.add('Y'); }
    return _set;
  }
  constructor({blue= false, red= false, green= false, yellow= false}) {
    this.blue = blue;
    this.red = red;
    this.green = green;
    this.yellow = yellow;
  }
}
