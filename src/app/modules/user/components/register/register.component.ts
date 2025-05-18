import { Component, OnInit } from '@angular/core';
import { IUserRegister } from '../../models/user.model';
import { AccountService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: IUserRegister = {
    UserName: '',
    Email: '',
    NationalId: '',
    PhoneNumber: '',
    Password: '',
    ConfirmPassowrd: '',
    Role: ''
  };
  constructor(private accountSrv:AccountService,private router: Router) { }
  //
  Send() {
    if (
      !this.user.UserName ||
      !this.user.Email ||
      !this.user.Password ||
      !this.user.ConfirmPassowrd ||
      !this.user.Role ||
      !this.user.NationalId ||
      !this.user.PhoneNumber
    ) {
      alert('Please fill all fields');
      return;
    }

    const username$ = this.accountSrv.CheckUsername(this.user.UserName);
    const email$ = this.accountSrv.CheckEmail(this.user.Email);
    const nationalId$ = this.accountSrv.CheckNationalId(this.user.NationalId);

    forkJoin([username$, email$, nationalId$]).subscribe({
      next: ([resUsername, resEmail, resNatId]) => {
        if (resUsername?.Status === 400) {
          alert('Username is already taken');
          return;
        }
        if (resEmail?.Status === 400) {
          alert('Email is already taken');
          return;
        }
        console.log(resNatId);
        if (resNatId?.Status === 400) {
          alert('National ID is already used');
          return;
        }

        // All good, proceed with registration
        this.accountSrv.Register(this.user).subscribe({
          next: (res) => {
            if (res?.Success || res?.Status === 200) {
              console.log(res)
              alert('Registration successful!');
             
              if (this.user.Role === 'ServiceProvider') {
                this.router.navigate(['/user/complete-profile']);
              }
            } else {
              alert('Registration failed.');
            }
          },
          error: (err) => {
            alert('Registration failed: ' + (err.message || 'Unknown error'));
          }
        });
      },
      error: (err) => {
        alert('Validation request failed: ' + (err.message || 'Unknown error'));
      }
    });
  }
}
