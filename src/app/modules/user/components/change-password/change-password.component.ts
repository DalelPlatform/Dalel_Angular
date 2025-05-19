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
  form!: FormGroup;           // <-- declare, but don’t initialize here
  isSubmitting = false;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    // now fb is available
    this.form = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }

  // type the group as AbstractControl or FormGroup
  passwordsMatch(group: AbstractControl) {
    const form = group as FormGroup;
    const np = form.get('newPassword')?.value;
    const cp = form.get('confirmPassword')?.value;
    return np === cp ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isSubmitting = true;

    // build a strictly-typed body
    const body: ChangePasswordRequest = {
      currentPassword: this.form.get('currentPassword')!.value,
      newPassword: this.form.get('newPassword')!.value,
      confirmPassword: this.form.get('confirmPassword')!.value
    };

    this.accountSrv.changePassword(body).subscribe({
      next: res => {
        this.serverMessage = res.Message;
        if (res.Success) {
          this.router.navigate(['/login'], { queryParams: { changed: true } });
        }
      },
      error: err => {
        this.serverMessage = err.error?.Message || 'Error changing password';
        this.isSubmitting = false;
      }
    });
  }
}
