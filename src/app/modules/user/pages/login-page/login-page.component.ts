import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: false,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private userService: UserService, private router: Router) {}

  onLogin(credentials: { userName: string; password: string }) {
    this.userService.login(credentials).subscribe(
      response => {
        if (response.Success) {
          const role = this.userService.getRole();
          if (role === 'ServiceProvider') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'Client') {
            this.router.navigate(['/client-dashboard']);
          }
        }
      },
      error => console.error(error)
    );
  }
}
