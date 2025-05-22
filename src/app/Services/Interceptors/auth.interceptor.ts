import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptorFn
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
console.log("in ineterceptor")
  const cookies = inject(CookieService)
  const token = cookies.get('Token');
  const authReq = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    : req;

    console.log(authReq)
  return next(authReq);

};
