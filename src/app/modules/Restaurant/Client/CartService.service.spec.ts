/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CartServiceService } from './CartService.service';

describe('Service: CartService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartServiceService]
    });
  });

  it('should ...', inject([CartServiceService], (service: CartServiceService) => {
    expect(service).toBeTruthy();
  }));
});
