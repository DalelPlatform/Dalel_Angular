import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { travelAgencyOwnersGuard } from './travel-agency-owners.guard';

describe('travelAgencyOwnersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => travelAgencyOwnersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
