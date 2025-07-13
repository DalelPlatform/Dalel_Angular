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
import { MealCardComponent } from './Client/meal-card/meal-card.component';
import { MenuItemsComponent } from './Client/menuItems/menuItems.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MealDetailsComponent } from './Client/meal-details/meal-details.component';
import { CartComponent } from './Client/cart/cart.component';
import { CartCheckoutComponent } from './Client/cart-checkout/cart-checkout.component';
import { clientGuard } from '../../Services/Guards/Client/client.guard';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { SharedModule } from '../../shared/shared.module';

let routes: Routes = [

  {
    path: "owner",
    component: RestaurantLayoutComponent,
    canActivate:[restaurantOwnerGuard],
    children: [
      {path: "add-restaurant", component: AddRestaurantFormComponent },

      {path : "add-meal", component:AddMealComponent},



      ]
  },
  {
    path: "client",
    component: RestaurantLayoutComponent,
    canActivate:[clientGuard],
    children: [
      {path : "search", component:RestaurantSearchComponent},
      {path : "get-all-restaurants" , component:GetAllRestaurantComponent},
      {path : "restaurant-meal-search", component:RestaurantMealSearchComponent}  ,
      {path : "restaurant-details/:id", component:RestaurantDetailsComponent},
      {path : "menuitems" , component: MenuItemsComponent },
      {path : "meal-details/:id", component: MealDetailsComponent},
      {path : "cart-checkout", component: CartCheckoutComponent}
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
    NavbarComponent,
    MealCardComponent,
    MenuItemsComponent,
    MealDetailsComponent,
    CartCheckoutComponent,
    RestaurantLayoutComponent


  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgxPaginationModule,
    SharedModule,
  ]
})
export class RestaurantModuleModule { }
