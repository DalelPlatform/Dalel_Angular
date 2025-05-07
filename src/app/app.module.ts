
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations:[
    AppComponent,
  
  ],
  imports: [
  SharedModule,
    BrowserModule,
   AppRoutingModule
    // ...
  ],
  
  bootstrap: [AppComponent],
})
// export class UserModule {}
export class AppModule {}
