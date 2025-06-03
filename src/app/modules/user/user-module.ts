import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import{LoginComponent} from '../user/components/login/login.component';
import { RegisterComponent } from "../user/components/register/register.component";
import { RouterModule } from "@angular/router";

import { accountRoutes } from './user-management-routing.module';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";
// import { CompleteProfileServiceProviderComponent } from "../ServiceProvider/complete-profile-service-provider/complete-profile-service-provider.component";
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HotelOwnerComponent } from './components/hotel-owner/hotel-owner.component';
import { CompleteProfilePageComponent } from "../../shared/components/complete-profile-page/complete-profile-page.component";
import { SharedModule } from "../../shared/shared.module";
import { loaderInterceptor } from "../../Services/Interceptors/loader/loader.interceptor";
import { AddServiceRequestComponent } from "./components/add-service-request/add-service-request.component";



@NgModule({
    declarations :[
        LoginComponent,
        RegisterComponent,
        CompleteProfilePageComponent,
        ProfileFormComponent,
        ChangePasswordComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        HotelOwnerComponent,
        AddServiceRequestComponent



    ],
    imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(accountRoutes),
    SharedModule
],
    providers: [
        provideHttpClient(withFetch(),
        withInterceptors([loaderInterceptor])
      ),

    ],


})
export class AccountModule { }

