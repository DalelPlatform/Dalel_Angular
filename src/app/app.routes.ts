import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { LogoutComponent } from './modules/user/components/logout/logout.component';
<<<<<<< HEAD
import { authGuard } from './Services/Guards/auth.guard';
=======
import { ProfileComponent } from './shared/components/profile/profile.component';
>>>>>>> 0ee238b0146ad6a0348d921fbd696c8f662dd90c

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/user/user-module').then(m => m.AccountModule),

<<<<<<< HEAD
    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [authGuard]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
=======
    { path: 'logout', component: LogoutComponent },
    {path:"accoutProfile",component:ProfileComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
>>>>>>> 0ee238b0146ad6a0348d921fbd696c8f662dd90c
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
