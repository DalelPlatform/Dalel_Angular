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
          res.Image = "pexels-galerieb-1148565.jpg"
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
              this.router.navigate(['/ServiceProviderlayout/AllRequests']);
            }
          },
          error: () => {
            this.router.navigate(['/unauthorized']);
          }
        });
      } else if (res.Role === "TravelAgencyOwner") {
        this.router.navigate(['/agancy/owner/create-agency']);
      } else {
        this.router.navigate(['/login']);
      }
    },
    error: (err) => {
      console.error('Login error:', err);
    }
  });
  }

}
