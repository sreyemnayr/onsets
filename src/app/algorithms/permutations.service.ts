import { Injectable, Input } from '@angular/core';
import { CubeComponent } from '../equipment/cubes/cube.component';
import { IDENTIFIER, MODIFIER, OPERATOR } from '../equipment/cubes/cube';

@Injectable({
  providedIn: 'root'
})
export class PermutationsService {
  @Input() cubes: Array<any>;

  constructor() {
    this.cubes = this.cubes || [];
  }

  combine(comboOptions, comboLength) {
  // If the length of the combination is 1 then each element of the original array
  // is a combination itself.
  if (comboLength === 1) {
    return comboOptions.map(comboOption => [comboOption]);
  }

  // Init combinations array.
  const combos = [];

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
      combos.push([currentOption].concat(smallerCombo));
    });
  });

  return combos;
}

 checkValidPermutation(permutation: Array<CubeComponent>) {
    if ( permutation[0].cube.faces[permutation[0].cube.face].functions_as !== IDENTIFIER) {
      return false;
    } else {
      if ( permutation.length === 1 ) {
        return true;
      }
    }
    if (permutation.length > 1) {
      for ( let i = 1; i < permutation.length ; i++ ) {

        if ( permutation[i].cube.faces[permutation[i].cube.face].functions_as === MODIFIER ) {
          if ( permutation[i - 1].cube.faces[permutation[i - 1].cube.face].functions_as !== IDENTIFIER &&
            permutation[i - 1].cube.faces[permutation[i - 1].cube.face].functions_as !== MODIFIER ) {
            return false;
          }
        }
        if ( permutation[i].cube.faces[permutation[i].cube.face].functions_as === IDENTIFIER ) {
          if ( permutation[i - 1].cube.faces[permutation[i - 1].cube.face].functions_as !== OPERATOR ) {
            return false;
          }
        }
        if ( permutation[i].cube.faces[permutation[i].cube.face].functions_as === OPERATOR ) {
          if ( permutation[i - 1].cube.faces[permutation[i - 1].cube.face].functions_as !== IDENTIFIER &&
            permutation[i - 1].cube.faces[permutation[i - 1].cube.face].functions_as !== MODIFIER ) {
            return false;
          }
        }
      }
    }
    if ( permutation[permutation.length - 1].cube.faces[permutation[permutation.length-1].cube.face].functions_as === OPERATOR) {
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
