import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PropertyOwnerCompleteProfileComponent
} from './components/property-owner-complete-profile/property-owner-complete-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PropertyOwnerLayoutComponent} from './components/property-owner-layout/property-owner-layout.component';
import {AddPropertyComponent} from './components/add-property/add-property.component';
import { SearchPropertyComponent } from './components/Client/search-property/search-property.component';
import { clientGuard } from '../../Services/Guards/Client/client.guard';
import { PropertyCardComponent } from './components/Client/property-card/property-card.component';
import { PropertyDetailsComponent } from './components/Client/property-details/property-details.component';
import { TestSearchComponent } from './components/Client/test-search/test-search.component';
import { TestDetailsComponent } from './components/Client/test-details/test-details.component';

let routes:Routes = [
  {path:'owner',component:PropertyOwnerLayoutComponent,
  children:[
    {path:'complete-profile',component:PropertyOwnerCompleteProfileComponent},
    {path:'add-property',component:AddPropertyComponent},
  ]},
  
  {path:'client',
    canActivate:[clientGuard],
    children:[
    {path:'search-property',component:SearchPropertyComponent},
    {path:'property-details/:id',component:PropertyDetailsComponent},
    {path:'test-search',component:TestSearchComponent},
    {path:'test-details/:id',component:TestDetailsComponent},

  ]},
];

@NgModule({
  declarations: [
    PropertyOwnerCompleteProfileComponent,
    PropertyOwnerLayoutComponent,
    AddPropertyComponent,
    SearchPropertyComponent,
    PropertyCardComponent,
    PropertyDetailsComponent,
    TestSearchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertyownerModule { }
