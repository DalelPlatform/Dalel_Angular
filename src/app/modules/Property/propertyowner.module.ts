import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PropertyOwnerCompleteProfileComponent
} from './components/PropertyOwner/property-owner-complete-profile/property-owner-complete-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {PropertyOwnerLayoutComponent} from './components/PropertyOwner/property-owner-layout/property-owner-layout.component';
import {AddPropertyComponent} from './components/PropertyOwner/Dashboard-Components/add-property/add-property.component';
import { SearchPropertyComponent } from './components/Client/search-property/search-property.component';
import { clientGuard } from '../../Services/Guards/Client/client.guard';
import { PropertyCardComponent } from './components/Client/property-card/property-card.component';
import { PropertyDetailsComponent } from './components/Client/property-details/property-details.component';
import { TestSearchComponent } from './components/Client/test-search/test-search.component';
import { TestDetailsComponent } from './components/Client/test-details/test-details.component';
import { BookPropertyComponent } from './components/Client/book-property/book-property.component';
import { SharedModule } from "../../shared/shared.module";
import { propertyOwnerGuard } from '../../Services/Guards/PropertyOwner/property-owner.guard';
import { ListingsComponent } from './components/PropertyOwner/Dashboard-Components/Listings/Listings.component';
import { LoaderComponent } from "../../component/loader/loader.component";
import { RatingsPipe } from "../../shared/pipes/Ratings.pipe";
import { BookingsComponent } from './components/PropertyOwner/Dashboard-Components/bookings/bookings.component';
import { PipesModule } from '../../shared/pipes/pipes.module';

let routes:Routes = [
  {path:'owner',component:PropertyOwnerLayoutComponent,
    // canActivate: [propertyOwnerGuard],
  children:[
    {path:'complete-profile',component:PropertyOwnerCompleteProfileComponent},
    {path:'add-property',component:AddPropertyComponent},
    {path:'listings',component:ListingsComponent},
    {path:'bookings',component:BookingsComponent},
  ]},
  
  {path:'client',
    canActivate:[clientGuard],
    children:[
    {path:'search-property',component:SearchPropertyComponent},
    {path:'property-details/:id',component:PropertyDetailsComponent},
    {path:'test-search',component:TestSearchComponent},
    {path:'test-details/:id',component:TestDetailsComponent},
    {path:'book-confirm', component:BookingsComponent},

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
    ListingsComponent,
    BookingsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    LoaderComponent,
    PipesModule,
  ]
})
export class PropertyownerModule { }
