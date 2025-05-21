
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
<<<<<<< HEAD
import { CoreModule } from './core/core.module';

=======
import { authInterceptor } from './Services/Interceptors/auth.interceptor';
>>>>>>> c86f4300a266ab589b4e8600fe6a24cf0b9804f9
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
    CoreModule
    
    
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
