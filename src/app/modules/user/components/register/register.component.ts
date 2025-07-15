import { Component, OnInit } from '@angular/core';
import { IUserRegister } from '../../models/user.model';
import { AccountService } from '../../services/user.service';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user: IUserRegister = {
    FirstName: '',
    LastName: '',
    UserName: '',
    Email: '',
    NationalId: '',
    PhoneNumber: '',
    Password: '',
    ConfirmPassowrd: '',
    Role: ''
  };
  constructor(
    private accountSrv: AccountService,
    private router: Router,
    private toastr: ToastrService
  ) { }
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
      this.toastr.error('Please fill all fields', 'Validation Error');
      return;
    }

    const username$ = this.accountSrv.CheckUsername(this.user.UserName);
    const email$ = this.accountSrv.CheckEmail(this.user.Email);
    const nationalId$ = this.accountSrv.CheckNationalId(this.user.NationalId);

    forkJoin([username$, email$, nationalId$]).subscribe({
      next: ([resUsername, resEmail, resNatId]) => {
        if (resUsername?.Status === 400) {
          this.toastr.error('Username is already taken', 'Registration Error');
          return;
        }
        if (resEmail?.Status === 400) {
          this.toastr.error('Email is already taken', 'Registration Error');
          return;
        }
        console.log(resNatId);
        if (resNatId?.Status === 400) {
          this.toastr.error('National ID is already used', 'Registration Error');
          return;
        }

        // All good, proceed with registration
        this.accountSrv.Register(this.user).subscribe({
          next: (res) => {
            if (res?.Success || res?.Status === 200) {
              console.log(res)
              this.toastr.success('Registration successful!', 'Success');
             
              // Redirect to login page after successful registration
              this.router.navigate(['/login']);
              
            } else {
              this.toastr.error('Registration failed.', 'Error');
            }
          },
          error: (err) => {
            this.toastr.error('Registration failed: ' + (err.message || 'Unknown error'), 'Error');
          }
        });
      },
      error: (err) => {
        this.toastr.error('Validation request failed: ' + (err.message || 'Unknown error'), 'Error');
      }
    });
  }
}
