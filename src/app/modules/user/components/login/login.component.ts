import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
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
    private router: Router

  ) { }
  Send() {
    this.accountSrv.Login(this.user.identifier, this.user.password).subscribe({
      next: (res) => {
        console.log(res);
        this.cookieService.set('Token', res.Token);
        this.cookieService.set('Role', res.Role);
         if(res.Role ==="TravelAgencyOwner"){
                 this.router.navigate(['/agancy/owner/create-agency']);
              }
         else if(res.Role ==="PropertyOwner"){
          this.router.navigate(['/property/owner/']);
         }
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
