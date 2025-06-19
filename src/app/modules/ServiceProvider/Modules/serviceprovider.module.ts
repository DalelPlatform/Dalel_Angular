import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteProfileServiceProviderComponent } from '../complete-profile-service-provider/complete-profile-service-provider.component';
import { ServiceProviderLayoutComponent } from '../service-provider-layout/service-provider-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddProjectComponent } from '../add-project/add-project.component';
import { serviceProviderGuard } from '../../../Services/Guards/ServiceProvider/service-provider.guard';
import { AddProposalComponent } from '../add-proposal/add-proposal.component';
import { ServiceProviderComponent } from '../service-provider/service-provider.component';
import { AcceptedProposalsComponent } from '../accepted-proposals/accepted-proposals.component';
import { ProposalListComponent } from '../proposal-list/proposal-list.component';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { AddServiceRequestComponent } from '../../user/components/add-service-request/add-service-request.component';
import { DatePipe } from '@angular/common';
import { AllRequestsComponent } from '../Clinet-ServiceProvider/all-requests/all-requests.component';
import { RequestDetailsComponent } from '../request-details/request-details-component.component';
import { StatusTextPipe } from "../Pipes/request-status.pipe";
import { ServiceProviderAllRequestsComponent } from '../service-provider-all-requests/service-provider-all-requests.component';
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
    TruncatePipe,
    CompleteProfileServiceProviderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceProviderSharedModule,
    ServiceProviderLayoutComponent,

    RouterModule.forChild(routes),
    HttpClientModule
  ],
  providers: [DatePipe]
})
export class ServiceproviderModule { }
