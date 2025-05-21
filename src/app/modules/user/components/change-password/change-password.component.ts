// src/app/modules/user/components/change-password/change-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AccountService } from '../../services/user.service';
import { ChangePasswordRequest } from '../../models/change-password.model';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  form!: FormGroup;
  isSubmitting = false;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });
  }

  passwordsMatch(group: AbstractControl) {
    const gp = group as FormGroup;
    return gp.get('newPassword')?.value === gp.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    const body: ChangePasswordRequest = {
      currentPassword: this.form.get('currentPassword')!.value,
      newPassword: this.form.get('newPassword')!.value,
      confirmPassword: this.form.get('confirmPassword')!.value
    };

    this.accountSrv.changePassword(body).subscribe({
      next: res => {
        // read either Message or Massage
        this.serverMessage = (res as any).Message ?? (res as any).Massage;
        // success check via Status (or via injected Success)
        if ((res as any).Status === 200 || (res as any).Success) {
          this.router.navigate(['/login'], { queryParams: { changed: true } });
        } else {
          this.isSubmitting = false;
        }
      },
      error: err => {
        this.serverMessage = err.error?.Message || 'Error changing password';
        this.isSubmitting = false;
      }
    });
  }
}