import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { authInterceptor } from './Services/Interceptors/auth.interceptor';

=======
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
>>>>>>> 90b31f59eb1e3167d47117454824e9ae0c6fb3f3
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
<<<<<<< HEAD
    provideHttpClient(withInterceptors([authInterceptor]))
=======
    importProvidersFrom(RouterModule) ,
>>>>>>> 90b31f59eb1e3167d47117454824e9ae0c6fb3f3
  ]
};
