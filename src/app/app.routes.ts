import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './shared/components/profile/profile.component';

 const routes: Routes = [
{
    path:"accountProfile",component:ProfileComponent
}
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
