import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/user/components/login/login.component';
import { RegisterComponent } from './modules/user/components/register/register.component';
import { LogoutComponent } from './modules/user/components/logout/logout.component';
import { ProfileComponent } from './shared/components/profile/profile.component';

export const routes: Routes = [
    {
        path: 'account',
        loadChildren: () => import('./modules/user/user-module').then(m => m.AccountModule)
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    { path: 'logout', component: LogoutComponent },
    {path:"accoutProfile",component:ProfileComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }