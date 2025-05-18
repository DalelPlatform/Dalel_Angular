import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import{LoginComponent} from '../user/components/login/login.component';
import { RegisterComponent } from "../user/components/register/register.component";
import { RouterModule } from "@angular/router";
import {accountroutes} from './user-management-routing.module';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { CompleteProfilePageComponent } from "./pages/complete-profile-page/complete-profile-page.component";
import { ProfileFormComponent } from "./components/profile-form/profile-form.component";
import { ServiceProviderProfileComponent } from "./components/service-provider-profile/service-provider-profile.component";


@NgModule({ 
    declarations :[  
        LoginComponent,
        RegisterComponent,
        CompleteProfilePageComponent,
        ProfileFormComponent,
        ServiceProviderProfileComponent,
        

        
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(accountroutes),
        ReactiveFormsModule,        
    ],
    providers: [
        provideHttpClient(withFetch())
    ],

})
export class AccountModule { }

