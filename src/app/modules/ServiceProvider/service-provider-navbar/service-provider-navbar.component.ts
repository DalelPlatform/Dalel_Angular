import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'service-provider-navbar',
  standalone: false,
  templateUrl: './service-provider-navbar.component.html',
  styleUrl: './service-provider-navbar.component.css'
})
export class ServiceProviderNavbarComponent {
  currentRoute: string = '';

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

isActive(path: string): boolean {
  return this.currentRoute === path || this.currentRoute === '/ServiceProviderlayout' + path;
}

}
