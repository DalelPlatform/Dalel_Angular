import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Read the JWT from the cookie
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('Token='))
      ?.split('=')[1];

    if (token) {
      // Clone the request and add the Authorization header
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${decodeURIComponent(token)}`
        }
      });
      return next.handle(authReq);
    }

    // No token found, send original request
    return next.handle(req);
  }
}
