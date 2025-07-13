import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-restaurant-layout',
  standalone: false,
  templateUrl: './restaurant-layout.component.html',
  styleUrl: './restaurant-layout.component.css'
})
export class RestaurantLayoutComponent {

   clientLinks = [
    { label: 'Create Agency', icon: 'fas fa-user', route: 'create-agency' },
    { label: 'List Agencies', icon: 'fas fa-users', route: 'ListAgencies' },
    { label: 'create package', icon: 'fas fa-ticket-alt', route: 'createPackage' },

    // { label: 'List Packages', icon: 'fas fa-credit-card', route: 'ListPackage' },
    { label: 'Notification', icon: 'fas fa-bell', route: 'notifications' },
    { label: 'insights', icon: 'fa-solid fa-chart-line', route: 'insights' },
    { label: 'Delete Profile', icon: 'fas fa-trash', route: 'delete' },
    { label: 'Sign Out', icon: 'fas fa-sign-out-alt', route: 'logout' },
  ];
}
