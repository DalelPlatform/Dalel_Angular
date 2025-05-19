import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  // imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone:false
})
export class ProfileComponent {
  showPassword: boolean = false;

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
