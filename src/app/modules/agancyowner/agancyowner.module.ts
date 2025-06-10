import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPackageComponent } from './compoments/add-package/add-package.component';
import { PackagedetailsComponent } from './compoments/packagedetails/packagedetails.component';
import { RouterModule, Routes } from '@angular/router';
import { AgancyownerlayoutComponent } from './compoments/agancyownerlayout/agancyownerlayout.component';
import { UserLayoutComponent } from '../user/components/user-layout/user-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

let routes: Routes = [

  {
    path: "owner",
    component: AgancyownerlayoutComponent,
    // canActivate:
    children: [
      { path: "add-package", component: AddPackageComponent },
      { path: "add-package", component: AddPackageComponent },
      { path: "add-package", component: AddPackageComponent },
      { path: "add-package", component: AddPackageComponent },
      { path: "add-package", component: AddPackageComponent },
      { path: "add-package", component: AddPackageComponent },
      { path: "add-package", component: AddPackageComponent },

    ]
  },
{
  //agancy/package-details/1
    path: "client",
    component: UserLayoutComponent,
    // canActivate:
    children: [
      { path: "package-details/:id", component: PackagedetailsComponent },
      { path: "package-details/:id", component: PackagedetailsComponent },
      { path: "package-details/:id", component: PackagedetailsComponent },
      { path: "package-details/:id", component: PackagedetailsComponent },
      { path: "package-details/:id", component: PackagedetailsComponent },

    ]
  },

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ],
  declarations: [
    AddPackageComponent,
    PackagedetailsComponent,
    AgancyownerlayoutComponent
  ]
})
export class AgancyownerModule { }


