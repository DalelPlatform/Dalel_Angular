import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteProfileServiceProviderComponent } from './complete-profile-service-provider/complete-profile-service-provider.component';
import { ServiceProviderLayoutComponent } from './service-provider-layout/service-provider-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AddProjectComponent } from './add-project/add-project.component';
import { serviceProviderGuard } from '../../Services/Guards/ServiceProvider/service-provider.guard';
import { AddProposalComponent } from './add-proposal/add-proposal.component';
import { ServiceProviderComponent } from './service-provider/service-provider.component';
import { AcceptedProposalsComponent } from './accepted-proposals/accepted-proposals.component';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { TruncatePipe } from '../ServiceProvider/truncate.pipe';
let routes: Routes = [
  {
    path: "ServiceProviderlayout",
    component: ServiceProviderLayoutComponent,
    children: [
      {path: "AddProject", component: AddProjectComponent},
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
  }
]
@NgModule({
  declarations: [
    CompleteProfileServiceProviderComponent,
    AddProjectComponent,
    ProposalListComponent,
    AddProposalComponent,
    ServiceProviderComponent,
    AcceptedProposalsComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,        
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    HttpClientModule,
  ],

  
})
export class ServiceproviderModule { }
