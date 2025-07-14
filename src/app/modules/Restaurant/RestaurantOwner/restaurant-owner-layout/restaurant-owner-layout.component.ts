import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-owner-layout',
  templateUrl: './restaurant-owner-layout.component.html',
  styleUrls: ['./restaurant-owner-layout.component.css'],
  standalone:false,
})
export class RestaurantOwnerLayoutComponent implements OnInit {

  agencyLinks = [
    { label: 'My Profile', icon: 'fas fa-user', route: 'restaurant-profile' },
    { label: 'Add Restaurant', icon: 'fa-solid fa-utensils', route: 'add-restaurant' },
    { label: 'Menu', icon: 'fa-solid fa-list', route: 'restaurant-meals' },
    { label: 'Reservations', icon: 'fa-solid fa-calendar-days', route: 'reservations' },
    { label: 'Reviews', icon: 'fas fa-heart', route: 'reviews' },
    { label: 'Settings', icon: 'fas fa-cog', route: 'settings' },
    { label: 'Notifications', icon: 'fas fa-bell', route: 'notifications' },
    { label: 'Delete Profile', icon: 'fas fa-trash', route: 'delete' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
