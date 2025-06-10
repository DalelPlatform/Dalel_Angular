import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRestaurantFormComponent } from './components/add-restaurant-form/add-restaurant-form.component';
import { RestaurantLayoutComponent } from './components/restaurant-layout/restaurant-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { restaurantOwnerGuard } from '../../Services/Guards/RestaurantOwner/restaurant-owner.guard';
import { GetAllRestaurantComponent } from './components/get-all-restaurant/get-all-restaurant.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';

let routes: Routes = [

  {
    path: "owner",
    component: RestaurantLayoutComponent,
    canActivate:[restaurantOwnerGuard],
    children: [
      {path: "add-restaurant", component: AddRestaurantFormComponent },
      {path : "get-all-restaurants" , component:GetAllRestaurantComponent},
      {path : "add-meal", component:AddMealComponent},
      {path : "restaurant-details/:id", component:RestaurantDetailsComponent},


      ]
  },


]

@NgModule({
  declarations: [
    AddRestaurantFormComponent,
    AddMealComponent,
    RestaurantDetailsComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RestaurantModuleModule { }
