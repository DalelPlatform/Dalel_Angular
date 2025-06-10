import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PropertyOwnerCompleteProfileComponent
} from './components/property-owner-complete-profile/property-owner-complete-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PropertyOwnerLayoutComponent} from './components/property-owner-layout/property-owner-layout.component';
import {AddPropertyComponent} from './components/add-property/add-property.component';
import { SearchPropertyComponent } from './components/Client/search-property/search-property.component';
import { clientGuard } from '../../Services/Guards/Client/client.guard';
import { PropertyCardComponent } from './components/Client/property-card/property-card.component';

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
  ]},

];

@NgModule({
  declarations: [
    PropertyOwnerCompleteProfileComponent,
    PropertyOwnerLayoutComponent,
    AddPropertyComponent,
    SearchPropertyComponent,
    PropertyCardComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertyownerModule { }
