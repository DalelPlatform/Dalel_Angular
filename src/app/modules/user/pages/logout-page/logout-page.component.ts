import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout-page',
  standalone: false,
  templateUrl: './logout-page.component.html',
  styleUrl: './logout-page.component.css'
})
export class LogoutPageComponent {
  constructor(private userService: UserService, private router: Router) {}

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
