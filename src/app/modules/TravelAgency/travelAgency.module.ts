import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgencycompleteProfileComponent } from './agencycomplete-profile/agencycomplete-profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgencyOwnerLayOutComponent } from './AgencyOwnerLayOut/AgencyOwnerLayOut.component';
import { SharedModule } from '../../shared/shared.module';
import { CreatePackageComponent } from './createPackage/createPackage.component';
import { ListAgenciesComponent } from './ListAgencies/ListAgencies.component';
import { ListPackagesComponent } from './ListPackages/ListPackages.component';
import { UpdateAgencyComponent } from './UpdateAgency/UpdateAgency.component';
import { UserLayoutComponent } from '../user/components/user-layout/user-layout.component';
import { travelAgencyOwnersGuard } from '../../Services/Guards/TravelAgencyOwners/travel-agency-owners.guard';
import { clientGuard } from '../../Services/Guards/Client/client.guard';
import { PackagesComponent } from './Client_side/Packages/Packages.component';
import { PackageDetailsComponent } from './Client_side/packageDetails/packageDetails.component';
import { ConfurmPackagePaymentComponent } from './Client_side/confurmPackagePayment/confurmPackagePayment.component';
import { SchadulesComponent } from './Schadules/Schadules.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AgencyDashboardComponent } from './agencyDashboard/agencyDashboard.component';
import {ReviewPackageComponent} from './Client_side/reviewPackage/reviewPackage.component';
import { GetpackagesReviewsComponent } from './GetpackagesReviews/GetpackagesReviews.component';
let routes: Routes = [

  {
    path: "owner",
    component: AgencyOwnerLayOutComponent,
       canActivate: [travelAgencyOwnersGuard],
    children: [
       { path: "create-agency", component: AgencycompleteProfileComponent },
       { path: "createPackage", component: CreatePackageComponent },
       { path: "ListAgencies", component: ListAgenciesComponent },
       { path: "ListPackage/:Id", component: ListPackagesComponent },
       { path: "ListPackage/Schadule/:Id", component: SchadulesComponent },
       { path: "updateAgency/:Id", component: UpdateAgencyComponent },
       { path: "notifications", component: NotificationsComponent },
       { path: "insights", component: AgencyDashboardComponent },

    ]
  },
{
  //agancy/package-details/1
    path: "client",
    component: UserLayoutComponent,
  //  canActivate: [clientGuard],
    children: [
   { path: "Packages", component: PackagesComponent },
  { path: "packageDetails/:Id", component: PackageDetailsComponent },
  { path: "confurmPackagePayment/:bookingId", component: ConfurmPackagePaymentComponent },
  { path: "ReviewPackage/:bookingId", component: ReviewPackageComponent },
    ]
  },
]
@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    
  ],
  declarations: [AgencycompleteProfileComponent,NotificationsComponent,
    CreatePackageComponent,UpdateAgencyComponent,ListAgenciesComponent,ListPackagesComponent,AgencyOwnerLayOutComponent,
    PackagesComponent,PackageDetailsComponent,SchadulesComponent,ConfurmPackagePaymentComponent,AgencyDashboardComponent,
    ReviewPackageComponent,GetpackagesReviewsComponent],
})
export class TravelAgencyModule { }
