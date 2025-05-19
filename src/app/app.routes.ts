import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { LogoutComponent } from './modules/user/components/logout/logout.component';
import { authGuard } from './Services/Guards/auth.guard';
import { ProfileFormComponent } from './modules/user/components/profile-form/profile-form.component';
import { CompleteProfilePageComponent } from './modules/user/pages/complete-profile-page/complete-profile-page.component';
import { AgencycompleteProfileComponent } from './modules/user/components/agencycomplete-profile/agencycomplete-profile.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
import { ServiceProviderProfileComponent } from './modules/user/components/service-provider-profile/service-provider-profile.component';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/user/user-module').then(m => m.AccountModule),

    canActivate: [authGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'complete-ServiceProvider-profile', component: ServiceProviderProfileComponent, canActivate: [authGuard] },

  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'AgencycompleteProfile',
    component: AgencycompleteProfileComponent,
    canActivate: [authGuard]
  },

  {
    path: 'agancy', 
    loadChildren: () => import('./modules/agancyowner/agancyowner.module').then(m => m.AgancyownerModule)
  },



  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
