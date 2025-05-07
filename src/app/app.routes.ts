import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { LogoutComponent } from './modules/user/components/logout/logout.component';
import { authGuard } from './Services/Guards/auth.guard';

export const routes: Routes = [
  {
    path: 'account',
    loadChildren: () => import('./modules/user/user-module').then(m => m.AccountModule),

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
