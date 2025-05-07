import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { homeChefGuard } from './home-chef.guard';

describe('homeChefGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => homeChefGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
