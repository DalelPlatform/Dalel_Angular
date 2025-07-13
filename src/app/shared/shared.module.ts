import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserLayoutComponent } from '../modules/user/components/user-layout/user-layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CartComponent } from '../modules/Restaurant/Client/cart/cart.component';


//import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    SidebarComponent,
    UserLayoutComponent,
    CartComponent
  ],

  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,




  ],
  exports:[
    NavbarComponent,FooterComponent,
    ProfileComponent,SidebarComponent
  ]
})
export class SharedModule { }
