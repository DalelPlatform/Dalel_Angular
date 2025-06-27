import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRestaurantFormComponent } from './components/add-restaurant-form/add-restaurant-form.component';
import { RestaurantLayoutComponent } from './components/restaurant-layout/restaurant-layout.component';
import { RouterModule, Routes } from '@angular/router';
import { restaurantOwnerGuard } from '../../Services/Guards/RestaurantOwner/restaurant-owner.guard';
import { GetAllRestaurantComponent } from './components/get-all-restaurant/get-all-restaurant.component';
import { AddMealComponent } from './components/add-meal/add-meal.component';
import { RestaurantSearchComponent } from './Client/restaurant-search/restaurant-search.component';
import { RestaurantCardComponent } from './Client/restaurant-card/restaurant-card.component';
import { NavbarComponent } from './components/restaurant-navbar/navbar.component';
import { RestaurantMealSearchComponent } from './Client/restaurant-meal-search/restaurant-meal-search.component';
import { RestaurantDetailsComponent } from './Client/restaurant-details/restaurant-details.component';

let routes: Routes = [

  {
    path: "owner",
    component: RestaurantLayoutComponent,
    canActivate:[restaurantOwnerGuard],
    children: [
      {path: "add-restaurant", component: AddRestaurantFormComponent },
      {path : "get-all-restaurants" , component:GetAllRestaurantComponent},
      {path : "add-meal", component:AddMealComponent},
      


      ]
  },
  {
    path: "client",
    component: RestaurantLayoutComponent,
    children: [
      {path : "search", component:RestaurantSearchComponent},
      {path : "restaurant-meal-search", component:RestaurantMealSearchComponent}  ,
      {path : "restaurant-details/:id", component:RestaurantDetailsComponent}
    ]
  }


]

@NgModule({
  declarations: [
    AddRestaurantFormComponent,
    AddMealComponent,
    RestaurantDetailsComponent,
    RestaurantSearchComponent,
    RestaurantCardComponent,
    NavbarComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RestaurantModuleModule { }
