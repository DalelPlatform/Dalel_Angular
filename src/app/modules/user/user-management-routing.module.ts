
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RoleGuard } from './services/role.guard'; // Adjust the import path as necessary

export const accountRoutes: Routes = [
   
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [RoleGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [ RouterModule.forChild( accountRoutes) ],
  exports: [ RouterModule ]
})
export class UserManagementRoutingModule { }
