// src/app/modules/user/components/forgot-password/forgot-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../../services/user.service';
import { ForgotPasswordRequest } from '../../models/forgot-password.model';

@Component({
  standalone: false,
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent implements OnInit {
  form!: FormGroup;
  serverMessage = '';

  constructor(
    private fb: FormBuilder,
    private accountSrv: AccountService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const body: ForgotPasswordRequest = {
      email: this.form.get('email')!.value
    };

    this.accountSrv.forgotPassword(body).subscribe({
      next: res => this.serverMessage = res.Message,
      error: () => this.serverMessage = 'Failed to send reset link.'
    });
  }
}
