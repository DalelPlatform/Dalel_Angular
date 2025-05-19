import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import{LoginComponent} from '../user/components/login/login.component';
import { RegisterComponent } from "../user/components/register/register.component";
import { RouterModule } from "@angular/router";

import { accountRoutes } from './user-management-routing.module';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { CompleteProfilePageComponent } from "./pages/complete-profile-page/complete-profile-page.component";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";
import { ServiceProviderProfileComponent } from "./components/service-provider-profile/service-provider-profile.component";

import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserLayoutComponent } from "./components/user-layout/user-layout.component";
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

