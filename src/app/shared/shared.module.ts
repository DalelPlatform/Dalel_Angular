import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { UserLayoutComponent } from '../modules/user/components/user-layout/user-layout.component';



@NgModule({
  declarations: [NavbarComponent,FooterComponent,ProfileComponent,SidebarComponent, UserLayoutComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    NavbarComponent,FooterComponent,RouterLink,
    FormsModule,ProfileComponent
  ]
})
export class SharedModule { }
