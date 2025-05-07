import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LogoutComponent } from "./components/logout/logout.component";
export let accountroutes:Routes=[
    {path:'Login',component:LoginComponent},
    {path:'Register',component:RegisterComponent},
    {path:'Logout',component:LogoutComponent},
    { path: '', redirectTo: 'Login', pathMatch: 'full' }
    
]