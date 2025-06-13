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

let routes: Routes = [
  {
    path: "ServiceProviderlayout",
    component: ServiceProviderLayoutComponent,
    children: [
      { path: "AddProject", component: AddProjectComponent },
    ]
  },
  {
    path: "AddProposal", component: AddProposalComponent,
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
    path: "CompleteProfileServiceProvider", component: CompleteProfileServiceProviderComponent,
    canActivate: [serviceProviderGuard]
  },
  {
    path: "AllRequests",
    component: AllRequestsComponent,

  },
  { path: 'request/:id', component: RequestDetailsComponent }

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
    
    TruncatePipe,
    CompleteProfileServiceProviderComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],
  bootstrap: [AddServiceRequestComponent],
  providers: [DatePipe],
})
export class ServiceproviderModule { }
