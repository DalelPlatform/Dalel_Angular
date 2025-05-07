import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    return true;
  } else {
    alert('Please log in to access this page');
    return false;
  }
};
