import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from './user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const allowedRoles = route.data['roles'] as Array<string>;
    const userRole = this.accountService.getRole();

    if (allowedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
