import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { serviceProviderGuard } from '../../../Services/Guards/ServiceProvider/service-provider.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditProfileComponent } from '../edit-profile/edit-profile.component'
import { AddServiceRequestComponent } from '../../user/components/add-service-request/add-service-request.component';
import { ServiceProviderLayoutComponent } from '../service-provider-layout/service-provider-layout.component';
import { AddProjectComponent } from '../add-project/add-project.component';
import { ServiceProviderComponent } from '../service-provider/service-provider.component';
import { ProposalListComponent } from '../proposal-list/proposal-list.component';
import { ServiceProviderAllRequestsComponent } from '../service-provider-all-requests/service-provider-all-requests.component';
import { RequestDetailsComponent } from '../request-details/request-details-component.component';
import { CompleteProfileServiceProviderComponent } from '../complete-profile-service-provider/complete-profile-service-provider.component';
import { AllRequestsComponent } from '../Clinet-ServiceProvider/all-requests/all-requests.component';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { ProjectsListComponent } from '../projects-list/projects-list.component';
import { EditScheduleComponent } from '../edit-schedule/edit-schedule.component';
import { ReviewsListComponent } from '../reviews-list/reviews-list.component';
import { SearchProvidersComponent } from '../LandingPageComponents/search-providers/search-providers.component';
import { ProviderProfileComponent } from '../LandingPageComponents/provider-profile/provider-profile.component';
import { ChatComponent } from '../Chat/Components/chat/chat.component';
import { clientGuard } from '../../../Services/Guards/Client/client.guard';
import { filter } from 'rxjs';
import { FilterPipe } from '../Clinet-ServiceProvider/filter.pipe';
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
        path: "ProjectsList", component: ProjectsListComponent,
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
      {
        path: "ProviderReview", component: ReviewsListComponent,
        canActivate: [serviceProviderGuard]
      }
    ]
  },
  {
    path: "ServiceProvider/ClientAllRequests",
    component: ServiceProviderAllRequestsComponent,
  },
  {
    path: "ServiceProvider/ClientRequests", component: AllRequestsComponent,
    canActivate: [clientGuard]
  },
  {
    path: 'ServiceChat', component: ChatComponent,
    // canActivate:[serviceProviderGuard, clientGuard]
  },
  { path: 'request/:id', component: RequestDetailsComponent },

  {
    path: "EditProfile", component: EditProfileComponent,
    canActivate: [serviceProviderGuard]
  },
  {
    path: "ReviewList", component: ReviewsListComponent
  },
  {
    path: "CompleteProfileServiceProvider", component: CompleteProfileServiceProviderComponent,
    canActivate: [serviceProviderGuard]
  },
  {
    path: "EditSchedule", component: EditScheduleComponent,
    canActivate: [serviceProviderGuard]
  },
  {
    path: "ServiceProvider/SearchServiceProviders", component: SearchProvidersComponent
  }
  ,
  {
    path: "ProviderProfile", component: ProviderProfileComponent
  }


]
@NgModule({
  declarations: [
    AddProjectComponent,
    ProposalListComponent,
    ServiceProviderComponent,
    ProjectsListComponent,
    AddServiceRequestComponent,
    EditProfileComponent,
    EditScheduleComponent,
    AllRequestsComponent,
    RequestDetailsComponent,
    ReviewsListComponent,
    ProviderProfileComponent,
    // SearchProvidersComponent,
    ServiceProviderAllRequestsComponent,
    CompleteProfileServiceProviderComponent,
  ],
  imports: [
    CommonModule,
    ChatComponent,
    ReactiveFormsModule,
    FormsModule,
    ServiceProviderLayoutComponent,
    TruncatePipe,
    NgxPaginationModule,
    FilterPipe,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class ServiceproviderModule { }
