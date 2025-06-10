import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-AgencyOwnerLayOut',
  templateUrl: './AgencyOwnerLayOut.component.html',
  styleUrls: ['./AgencyOwnerLayOut.component.css'],
  standalone:false
})
export class AgencyOwnerLayOutComponent implements OnInit {
  agencyLinks = [
    { label: 'Create Agency', icon: 'fas fa-user', route: 'create-agency' },
    { label: 'create package', icon: 'fas fa-ticket-alt', route: 'createPackage' },
    { label: 'Travelers', icon: 'fas fa-users', route: 'travelers' },
    { label: 'Payment Details', icon: 'fas fa-credit-card', route: 'payments' },
    { label: 'Wishlist', icon: 'fas fa-heart', route: 'wishlist' },
    { label: 'Settings', icon: 'fas fa-cog', route: 'settings' },
    { label: 'Delete Profile', icon: 'fas fa-trash', route: 'delete' },
    { label: 'Sign Out', icon: 'fas fa-sign-out-alt', route: 'logout' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
