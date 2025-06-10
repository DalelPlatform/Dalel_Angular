import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencycompleteProfileComponent } from './agencycomplete-profile/agencycomplete-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgencyOwnerLayOutComponent } from './AgencyOwnerLayOut/AgencyOwnerLayOut.component';
import { SharedModule } from '../../shared/shared.module';
import { CreatePackageComponent } from './createPackage/createPackage.component';
let routes: Routes = [

  {
    path: "owner",
    component: AgencyOwnerLayOutComponent,
    // canActivate:
    children: [
       { path: "create-agency", component: AgencycompleteProfileComponent },
       { path: "createPackage", component: CreatePackageComponent },

    ]
  }

]
@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [AgencycompleteProfileComponent,CreatePackageComponent,AgencyOwnerLayOutComponent]
})
export class TravelAgencyModule { }
