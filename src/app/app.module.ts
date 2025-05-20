
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { AccountModule } from './modules/user/user-module'; 
import { routes } from './app.routes';
import {CookieService} from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './Services/Interceptors/auth.interceptor';
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
    
    
  ],
  providers: [CookieService, 
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor,])
    )
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
