
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { HotelOwnerComponent } from './components/hotel-owner/hotel-owner.component';
import { authGuard } from '../../Services/Guards/auth.guard';
import { AddServiceRequestComponent } from './components/add-service-request/add-service-request.component';

export const accountRoutes: Routes = [
  {path: 'hotel-owner',component: HotelOwnerComponent},
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [authGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {path: 'ServiceRequest/add', component: AddServiceRequestComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [ RouterModule.forChild( accountRoutes) ],
  exports: [ RouterModule ]
})
export class UserManagementRoutingModule { }
