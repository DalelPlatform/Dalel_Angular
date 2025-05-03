import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register-page',
  standalone: false,
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})

export class RegisterPageComponent {
  constructor(private userService: UserService, private router: Router) {}

  onRegister(user: User) {
    this.userService.register(user).subscribe(
      response => {
        if (response.Success) {
          this.router.navigate(['/login']);
        }
      },
      error => console.error(error)
    );
  }
}