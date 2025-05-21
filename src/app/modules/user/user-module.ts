import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import{LoginComponent} from '../user/components/login/login.component';
import { RegisterComponent } from "../user/components/register/register.component";
import { RouterModule } from "@angular/router";

import { accountRoutes } from './user-management-routing.module';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";
import { ServiceProviderProfileComponent } from "./components/service-provider-profile/service-provider-profile.component";

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HotelOwnerComponent } from './components/hotel-owner/hotel-owner.component';
import { CompleteProfilePageComponent } from "../../shared/components/complete-profile-page/complete-profile-page.component";
import { SharedModule } from "../../shared/shared.module";



@NgModule({
    declarations :[
        LoginComponent,
        RegisterComponent,
        CompleteProfilePageComponent,
        ProfileFormComponent,
        ServiceProviderProfileComponent,

        ChangePasswordComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        HotelOwnerComponent
        


    ],
    imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(accountRoutes),
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // needed for reactive forms
    RouterModule.forChild(accountRoutes),
    RouterModule.forChild(accountRoutes),
    ReactiveFormsModule,
    SharedModule
],
    providers: [
        provideHttpClient(withFetch())
    ],

})
export class AccountModule { }

