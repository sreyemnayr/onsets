import { TestBed } from '@angular/core/testing';

import { PermutationsService } from './permutations.service';

describe('PermutationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermutationsService = TestBed.get(PermutationsService);
    expect(service).toBeTruthy();
  });
});
