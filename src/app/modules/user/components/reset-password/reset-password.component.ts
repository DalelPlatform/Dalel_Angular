// src/app/modules/user/components/reset-password/reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/user.service';
import { ResetPasswordRequest } from '../../models/reset-password.model';

@Component({
  standalone: false,
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent implements OnInit {
  form!: FormGroup;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private accountSrv: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });

    this.route.queryParams.subscribe(params => {
      this.form.patchValue({
        token: params['token'] || '',
        email: params['email'] || ''
      });
    });
  }

  passwordsMatch(group: AbstractControl) {
    const form = group as FormGroup;
    return form.get('newPassword')!.value === form.get('confirmPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.form.invalid) return;

    const body: ResetPasswordRequest = {
      email: this.form.get('email')!.value,
      token: this.form.get('token')!.value,
      newPassword: this.form.get('newPassword')!.value,
      confirmPassword: this.form.get('confirmPassword')!.value
    };

    this.accountSrv.resetPassword(body).subscribe({
      next: res => {
        this.serverMessage = res.Message;
        if (res.Success) {
          this.router.navigate(['/login'], { queryParams: { reset: true } });
        }
      },
      error: () => this.serverMessage = 'Reset failed.'
    });
  }
}
