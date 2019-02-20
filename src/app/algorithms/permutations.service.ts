import { Injectable, Input } from '@angular/core';
import { CubeComponent } from '../equipment/cubes/cube.component';
import { IDENTIFIER, MODIFIER, OPERATOR, RESTRICTOR } from '../equipment/cubes/cube';

export const FACES = {
  R : 1,
  B : 2,
  Y : 3,
  G : 4,

  UNIVERSE : 5,
  EMPTY : 6,

  UNION : 11,
  INTERSECT : 12,
  DIFFERENCE : 13,

  COMPLEMENT : 21,

  SUBSET : 31,
  EQUALITY : 32,

  value_hashes : function(v) {
    switch (v) {
    case 'R': return this.R;
    case 'B': return this.B;
    case 'Y': return this.Y;
    case 'G': return this.G;
    case '∪': return this.UNION;
    case '∩': return this.INTERSECT;
    case '—': return this.DIFFERENCE;
    case '´': return this.COMPLEMENT;
    case 'V': return this.UNIVERSE;
    case 'Λ': return this.EMPTY;
    case '⊆': return this.SUBSET;
    case '=': return this.EQUALITY;
    }
  },



};




@Injectable({
  providedIn: 'root'
})
export class PermutationsService {
  @Input() cubes: Array<any>;

  constructor() {
    this.cubes = this.cubes || [];
  }

  checkType(cubeHash) {
    if (cubeHash < 10) { return IDENTIFIER; } else if (cubeHash < 20) { return OPERATOR; } else if (cubeHash < 30) { return MODIFIER; } else { return RESTRICTOR; }
  }

  hash_to_string (hash) {
    switch (hash) {
      case FACES.R: return          'R';
      case FACES.B: return          'B';
      case FACES.Y: return          'Y';
      case FACES.G: return          'G';
      case FACES.UNION: return      '∪';
      case FACES.INTERSECT: return  '∩';
      case FACES.DIFFERENCE: return '—';
      case FACES.COMPLEMENT: return '´';
      case FACES.UNIVERSE: return   'V';
      case FACES.EMPTY: return      'Λ';
      case FACES.SUBSET: return     '⊆';
      case FACES.EQUALITY: return   '=';
    }
  }

  hashCubes(cubes) {
    const hashedCubes = []
    cubes.forEach((c) => {
      hashedCubes.push(FACES.value_hashes(c.cube.faces[c.cube.face].value));
    });
    return hashedCubes;
  }

  checkValidCombo(combo, required= []) {
    const r = Array.from(Object.create(required));
    if (combo.length === 1) { return false; }
    const count = [0, 0, 0];
    combo.forEach(
      (c) => {
        const index = r.indexOf(c);
        if (index > -1) {
          r.splice(index, 1);
        }
      count[this.checkType(c)]++;
      }

    );
    if (r.length > 0) { return false; }
    if (count[IDENTIFIER] === 0) {  return false; }
    if (count[OPERATOR] >= count[IDENTIFIER]) {   return false; }
    if (count[IDENTIFIER] > count[OPERATOR] + 1) {  return false; }
    return true;
  }

  combine(comboOptions, comboLength) {
  // If the length of the combination is 1 then each element of the original array
  // is a combination itself.
  if (comboLength === 1) {
    return comboOptions.map(comboOption => [comboOption]);
  }

  // Init combinations array.
  const combos = [];
  const valid_combos = [];

  // Extract characters one by one and concatenate them to combinations of smaller lengths.
  // We need to extract them because we don't want to have repetitions after concatenation.
  comboOptions.forEach((currentOption, optionIndex) => {
    // Generate combinations of smaller size.
    const smallerCombos = this.combine(
      comboOptions.slice(optionIndex + 1),
      comboLength - 1,
    );

    // Concatenate currentOption with all combinations of smaller size.
    smallerCombos.forEach((smallerCombo) => {
      // console.log(currentOption);
      // if ( this.checkValidCombo([currentOption].concat(smallerCombo))) { valid_combos.push([currentOption].concat(smallerCombo)); }
      combos.push([currentOption].concat(smallerCombo));
    });
  });
  return this.removeDuplicateCombos(combos);
}

removeDuplicateCombos(combos) {
    const uniqueCombosSet = new Set();
    const uniqueCombos = []
    combos.forEach((combo) => {
      combo.sort(function(a, b) {return a - b; });
      if (!uniqueCombosSet.has(combo.toString())) {
        uniqueCombos.push(combo);
        uniqueCombosSet.add(combo.toString());
      }

    });
    return uniqueCombos;
}

 checkValidPermutation(permutation: Array<CubeComponent>) {
    if ( this.checkType(permutation[0]) !== IDENTIFIER) {
      return false;
    } else {
      if ( permutation.length === 1 ) {
        return true;
      }
    }
    if (permutation.length > 1) {
      for ( let i = 1; i < permutation.length ; i++ ) {

        if ( this.checkType(permutation[i]) === MODIFIER ) {
          if ( this.checkType(permutation[i - 1]) !== IDENTIFIER &&
            this.checkType(permutation[i - 1]) !== MODIFIER ) {
            return false;
          }
        }
        if ( this.checkType(permutation[i]) === IDENTIFIER ) {
          if ( this.checkType(permutation[i - 1]) !== OPERATOR ) {
            return false;
          }
        }
        if ( this.checkType(permutation[i]) === OPERATOR ) {
          if ( this.checkType(permutation[i - 1]) !== IDENTIFIER &&
            this.checkType(permutation[i - 1]) !== MODIFIER ) {
            return false;
          }
        }
      }
    }
    if ( this.checkType(permutation[permutation.length - 1]) === OPERATOR) {
      return false;
    }
    return true;
 }


  *permute(permutation) {
  const length = permutation.length;
  const c = Array(length).fill(0);
  let i = 1, k, p, to_yield;

  to_yield = permutation.slice();
  if (this.checkValidPermutation(to_yield)) { yield to_yield; }
  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      to_yield = permutation.slice();
      if (this.checkValidPermutation(to_yield)) { yield to_yield; }
    } else {
      c[i] = 0;
      ++i;
    }
  }
}
}
