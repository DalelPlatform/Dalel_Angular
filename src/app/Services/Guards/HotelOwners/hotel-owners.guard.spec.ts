import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { hotelOwnersGuard } from './hotel-owners.guard';

describe('hotelOwnersGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => hotelOwnersGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
