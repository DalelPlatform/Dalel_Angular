
// src/app/app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; 
import { AccountModule } from './modules/user/user-module'; 
import { routes } from './app.routes';
import {CookieService} from 'ngx-cookie-service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    // SharedModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), // عشان <router-outlet> تشتغل
    AccountModule,
    SharedModule
  ],
  providers: [[CookieService]],
  bootstrap: [AppComponent]
})
export class AppModule {}
