
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import {CookieService} from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { authInterceptor } from './Services/Interceptors/auth.interceptor';
import { LoaderComponent } from "./component/loader/loader.component";
import { loaderInterceptor } from './Services/Interceptors/loader/loader.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AccountModule } from './modules/user/user-module';
import { ServiceproviderModule } from './modules/serviceprovider/Modules/serviceprovider.module';
@NgModule({
  declarations: [
    AppComponent,
    // SharedModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    AccountModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    ServiceproviderModule,
    LoaderComponent,
         BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot(), // ToastrModule added
],

  providers: [CookieService,

    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor,loaderInterceptor])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
