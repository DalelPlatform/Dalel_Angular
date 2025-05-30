import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompleteProfileServiceProviderComponent } from './complete-profile-service-provider/complete-profile-service-provider.component';
import { ServiceProviderLayoutComponent } from './service-provider-layout/service-provider-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { AddProjectComponent } from './add-project/add-project.component';
import { serviceProviderGuard } from '../../Services/Guards/ServiceProvider/service-provider.guard';
let routes: Routes = [
  {
    path: "Service-Provider-layout",
    component: ServiceProviderLayoutComponent,
    children: [
      {path: "Add-Project", component: AddProjectComponent},
    ]
  }
]
@NgModule({
  declarations: [
    CompleteProfileServiceProviderComponent,
    AddProjectComponent
  ],
  imports: [
    ServiceProviderLayoutComponent,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,        
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class ServiceproviderModule { }
