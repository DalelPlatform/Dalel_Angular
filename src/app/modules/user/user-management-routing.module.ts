import { Routes } from "@angular/router";
<<<<<<< HEAD

export let accountroutes:Routes=[
    {
      // path : 'edit' , component :
    }

]
=======
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { CompleteProfilePageComponent } from "./pages/complete-profile-page/complete-profile-page.component";
export let accountroutes:Routes=[
    {path:'Login',component:LoginComponent},
    {path:'Register',component:RegisterComponent},
    {path:'Logout',component:LogoutComponent},
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: 'complete-profile', component: CompleteProfilePageComponent },
]
>>>>>>> 0ee238b0146ad6a0348d921fbd696c8f662dd90c
