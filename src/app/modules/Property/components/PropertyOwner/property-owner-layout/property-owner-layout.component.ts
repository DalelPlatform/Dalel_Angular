import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-property-owner-layout',
  templateUrl: './property-owner-layout.component.html',
  styleUrl: './property-owner-layout.component.css',
  standalone:false,
})
export class PropertyOwnerLayoutComponent implements OnInit {
  agencyLinks = [
    { label: 'My Profile', icon: 'fas fa-user', route: 'property-profile' },
    { label: 'My Listings', icon: 'fa-solid fa-list', route: 'listings' },
    { label: 'Tenets', icon: 'fas fa-users', route: 'tenets' },
    { label: 'Bookings', icon: 'fa-solid fa-calendar-days', route: 'bookings' },
    { label: 'Payment Details', icon: 'fas fa-credit-card', route: 'payments' },
    { label: 'Reviews', icon: 'fas fa-heart', route: 'review' },
    { label: 'Settings', icon: 'fas fa-cog', route: 'settings' },
    { label: 'Delete Profile', icon: 'fas fa-trash', route: 'delete' },
    { label: 'Sign Out', icon: 'fas fa-sign-out-alt', route: 'logout' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
