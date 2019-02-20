import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetsService {

  constructor() { }

  union(a, b) {
    return new Set([...a, ...b]);
  }

  intersection(a, b) {
    return new Set([...a].filter(x => b.has(x)));
  }

  difference(a, b) {
    return new Set([...a].filter(x => !b.has(x)));
  }

}
