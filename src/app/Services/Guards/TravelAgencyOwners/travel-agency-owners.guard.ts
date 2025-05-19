import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const travelAgencyOwnersGuard: CanActivateFn = (route, state) => {
  const cookieService = inject(CookieService).get('Token');
  const role = inject(CookieService).get('Role');


  if (cookieService && role == "TravelAgencyOwners") {
    return true;
  } else {
    alert('This page is not valid');
    return false;
  }
};
