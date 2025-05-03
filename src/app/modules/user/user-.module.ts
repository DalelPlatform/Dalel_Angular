import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { UserRoutingModule } from './user-management-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LogoutPageComponent } from './pages/logout-page/logout-page.component';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    LogoutPageComponent,
    LogoutComponent 
  ],
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    LoginComponent,
    LogoutComponent,
    RegisterComponent
]
})
export class UserModule {}