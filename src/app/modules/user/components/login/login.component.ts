import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { CompleteProfileServiceProviderService } from '../../../serviceprovider/Services/CompleteProfileServiceProvider.Service'

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: { identifier: string; password: string } = {
    identifier: '',
    password: ''
  };
  constructor(private accountSrv: AccountService,
    private cookieService: CookieService,
    private router: Router,
    private ServiceProviderProfileService: CompleteProfileServiceProviderService,
  ) { }

  
  Send() {
  this.accountSrv.Login(this.user.identifier, this.user.password).subscribe({
    next: (res) => {
      console.log(res);

        if(res.Image == "empty"){
          res.Image = "https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
      }

      this.cookieService.set('Token', res.Token);
      this.cookieService.set('Role', res.Role);
      this.cookieService.set('Image', res.Image);
      this.cookieService.set('FullName', res.FullName);

        if (res.Role === 'ServiceProvider') {
          this.ServiceProviderProfileService.checkProfileCompletion().subscribe({
            next: (isComplete) => {
              if (!isComplete) {
                this.router.navigate(['/CompleteProfileServiceProvider']);
              } else {
                this.router.navigate(['/service-provider']);
              }
            },
            error: () => {
              this.router.navigate(['/unauthorized']);
            }
          });
     
         if (res.Role === 'ServiceProvider') {
          // this.ServiceProviderProfileService.checkProfileCompletion().subscribe({
          //   next: (isComplete) => {
          //     if (!isComplete) {
          //       this.router.navigate(['/complete-ServiceProvider-profile']);
          //     } else {
          //       this.router.navigate(['/account']);
          //     }
          //   },
          //   error: () => {
          //     this.router.navigate(['/unauthorized']);
          //   }
          // });
        } else {
          this.router.navigate(['/account']);
        }
      
      }
    else if(res.Role ==="TravelAgencyOwner"){
                 this.router.navigate(['/agancy/owner/insights']);
              }
              else if(res.Role ==="Client"){
                      this.router.navigate(['/mainPage']);
              }
              else{
                  this.router.navigate(['/login']);
              }
    }
   
    });
  }

}
