import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { LogoutComponent } from './modules/user/components/logout/logout.component';
import { authGuard } from './Services/Guards/auth.guard';
import { ProfileFormComponent } from './modules/user/components/profile-form/profile-form.component';
import { CompleteProfilePageComponent } from './shared/components/complete-profile-page/complete-profile-page.component';
// import { AgencycompleteProfileComponent } from './modules/user/components/agencycomplete-profile/agencycomplete-profile.component';
import { ProfileComponent } from './shared/components/profile/profile.component';
// import { ServiceProviderProfileComponent } from './modules/user/components/service-provider-profile/service-provider-profile.component';
import { AgencyOwnerLayOutComponent } from './modules/TravelAgency/AgencyOwnerLayOut/AgencyOwnerLayOut.component';

// import { CompleteProfileServiceProviderComponent } from './modules/ServiceProvider/complete-profile-service-provider/complete-profile-service-provider.component';
import { AgencycompleteProfileComponent } from './modules/TravelAgency/agencycomplete-profile/agencycomplete-profile.component';
export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/user/user-module').then(m => m.AccountModule),

    canActivate: [authGuard]
  },
  {
    path:'restaurant',
    loadChildren: () => import('./modules/Restaurant/restaurant.module').then(r => r.RestaurantModuleModule),
    // canActivate: []
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'complete-ServiceProvider-profile', component: CompleteProfileServiceProviderComponent , canActivate: [authGuard]},
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [authGuard]
  },
  {
    path: 'agancy', 
     canActivate: [authGuard],
    loadChildren: () => import('./modules/TravelAgency/travelAgency.module').then(m => m.TravelAgencyModule)
  },


  { path: 'logout', component: LogoutComponent,canActivate: [authGuard] },
  {path: 'AgencycompleteProfile', component: AgencycompleteProfileComponent,canActivate: [authGuard]   },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
