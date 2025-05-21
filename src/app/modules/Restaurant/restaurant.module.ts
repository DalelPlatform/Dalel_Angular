import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddRestaurantFormComponent } from './components/add-restaurant-form/add-restaurant-form.component';
import { RestaurantLayoutComponent } from './components/restaurant-layout/restaurant-layout.component';
import { RouterModule, Routes } from '@angular/router';

let routes: Routes = [

  {
    path: "owner",
    component: RestaurantLayoutComponent,
    // canActivate:
    children: [
      { path: "add-restaurant", component: AddRestaurantFormComponent },

    ]
  },


]

@NgModule({
  declarations: [
    AddRestaurantFormComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class RestaurantModuleModule { }
