import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [NavbarComponent,FooterComponent,ProfileComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  exports:[
    NavbarComponent,FooterComponent,RouterLink,
    FormsModule,ProfileComponent
  ]
})
export class SharedModule { }
