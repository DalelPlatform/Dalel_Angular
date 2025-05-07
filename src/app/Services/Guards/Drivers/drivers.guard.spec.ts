import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { driversGuard } from './drivers.guard';

describe('driversGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => driversGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
