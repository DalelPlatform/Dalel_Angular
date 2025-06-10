import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencycompleteProfileComponent } from './agencycomplete-profile/agencycomplete-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgencyOwnerLayOutComponent } from './AgencyOwnerLayOut/AgencyOwnerLayOut.component';

let routes: Routes = [

  {
    path: "owner",
    component: AgencyOwnerLayOutComponent,
    // canActivate:
    children: [
       { path: "create-agency", component: AgencycompleteProfileComponent },

    ]
  }

]
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)


  ],
  declarations: [AgencycompleteProfileComponent,AgencyOwnerLayOutComponent]
})
export class TravelAgencyModule { }
