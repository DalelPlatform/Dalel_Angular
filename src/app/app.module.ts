import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    HttpClientModule
    // ...
  ]
})
export class UserModule {}
export class AppModule {}
