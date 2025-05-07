import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import{LoginComponent} from '../user/components/login/login.component';
import { RegisterComponent } from "../user/components/register/register.component";
import { RouterModule } from "@angular/router";
import {accountroutes} from './user-management-routing.module';
import { FormsModule } from "@angular/forms";
import { provideHttpClient, withFetch } from "@angular/common/http";

@NgModule({ 
    declarations :[  
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(accountroutes),
    ],
    providers: [
        provideHttpClient(withFetch())
    ],

})
export class AccountModule { }

