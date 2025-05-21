
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('Token='))
      ?.split('=')[1];

    if (token) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${decodeURIComponent(token)}` }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
