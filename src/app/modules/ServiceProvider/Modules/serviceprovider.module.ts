import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { serviceProviderGuard } from '../../../Services/Guards/ServiceProvider/service-provider.guard';

import { AddServiceRequestComponent } from '../../user/components/add-service-request/add-service-request.component';
import { ServiceProviderLayoutComponent } from '../service-provider-layout/service-provider-layout.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ServiceProviderComponent } from '../service-provider/service-provider.component';
import { AcceptedProposalsComponent } from '../accepted-proposals/accepted-proposals.component';
import { ProposalListComponent } from '../proposal-list/proposal-list.component';
import { ServiceProviderAllRequestsComponent } from '../service-provider-all-requests/service-provider-all-requests.component';
import { RequestDetailsComponent } from '../request-details/request-details-component.component';
import { AddProposalComponent } from '../add-proposal/add-proposal.component';
import { CompleteProfileServiceProviderComponent } from '../complete-profile-service-provider/complete-profile-service-provider.component';
import { AllRequestsComponent } from '../Clinet-ServiceProvider/all-requests/all-requests.component';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { ServiceProviderProfileComponent } from '../service-provider-profile/service-provider-profile.component';
import { ServiceProviderProjectsComponent } from '../service-provider-projects/service-provider-projects.component';
import { ServiceProviderReviewsComponent } from '../service-provider-reviews/service-provider-reviews.component';
import { ServiceProviderProposalsComponent } from '../service-provider-proposals/service-provider-proposals.component';
import { ServiceProviderSharedModule } from './service-provider-shared.module';

let routes: Routes = [
  {
    path: "ServiceProviderlayout",
    component: ServiceProviderLayoutComponent,
    children: [
      {
        path: "AddProject", component: AddProjectComponent,
        canActivate: [serviceProviderGuard]
      },
      {
        path: "ServiceProvider", component: ServiceProviderComponent,
        canActivate: [serviceProviderGuard]
      },
      {
        path: "AcceptedProposals", component: AcceptedProposalsComponent,
        canActivate: [serviceProviderGuard]
      },
      {
        path: "ProposalList", component: ProposalListComponent,
        canActivate: [serviceProviderGuard]
      },
      {
        path: "AllRequests",
        component: ServiceProviderAllRequestsComponent,
        canActivate: [serviceProviderGuard]

      },
    ]
  },
  { path: 'request/:id', component: RequestDetailsComponent },
  
  {
    path: "AddProposal", component: AddProposalComponent,
    canActivate: [serviceProviderGuard]
  },


  {
    path: "CompleteProfileServiceProvider", component: CompleteProfileServiceProviderComponent,
    canActivate: [serviceProviderGuard]
  },



]
@NgModule({
  declarations: [
    AddProjectComponent,
    ProposalListComponent,
    AddProposalComponent,
    ServiceProviderComponent,
    AcceptedProposalsComponent,
    AddServiceRequestComponent,
    AllRequestsComponent,
    RequestDetailsComponent,
    ServiceProviderAllRequestsComponent,
    CompleteProfileServiceProviderComponent,
    ServiceProviderProfileComponent,
    ServiceProviderProjectsComponent,
    ServiceProviderProposalsComponent,
    ServiceProviderReviewsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceProviderSharedModule,
    ServiceProviderLayoutComponent,
    TruncatePipe,
    RouterModule.forChild(routes),
],
  providers: []
})
export class ServiceproviderModule { }
