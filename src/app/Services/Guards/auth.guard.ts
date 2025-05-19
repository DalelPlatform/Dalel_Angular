import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  // const token = localStorage.getItem('access_token');
  // const token = Inject(CookieService).getItem('Token')
  const cookieService = inject(CookieService).get('Token');


  if (cookieService) {
    return true;
  } else {
    alert('Please log in to access this page');
    return false;
  }
};
