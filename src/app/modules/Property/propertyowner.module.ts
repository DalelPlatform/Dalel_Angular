import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PropertyOwnerCompleteProfileComponent
} from './components/property-owner-complete-profile/property-owner-complete-profile.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

let routes:Routes = [
  {path:'complete-profile',component:PropertyOwnerCompleteProfileComponent},
];

@NgModule({
  declarations: [
    PropertyOwnerCompleteProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PropertyownerModule { }
