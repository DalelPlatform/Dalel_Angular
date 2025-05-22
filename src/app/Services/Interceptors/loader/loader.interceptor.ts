import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../../loader.service';
import { finalize } from 'rxjs';


export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let loaderServ = inject(LoaderService);
  //start ==> show Loader
  loaderServ.show()
  return next(req).pipe(
    //end ==> hide Loader
    finalize(() => {
      loaderServ.hide()
    })
  );


};
