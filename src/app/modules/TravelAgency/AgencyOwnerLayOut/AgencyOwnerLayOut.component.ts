import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../Services/TravelAgency/notification.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-AgencyOwnerLayOut',
  templateUrl: './AgencyOwnerLayOut.component.html',
  styleUrls: ['./AgencyOwnerLayOut.component.css'],
  standalone:false
})
export class AgencyOwnerLayOutComponent implements OnInit {
  agencyLinks = [
    { label: 'Create Agency', icon: 'fas fa-user', route: 'create-agency' },
    { label: 'List Agencies', icon: 'fas fa-users', route: 'ListAgencies' },
    { label: 'create package', icon: 'fas fa-ticket-alt', route: 'createPackage' },

    // { label: 'List Packages', icon: 'fas fa-credit-card', route: 'ListPackage' },
    { label: 'Notification', icon: 'fas fa-bell', route: 'notifications' },
    { label: 'insights', icon: 'fa-solid fa-chart-line', route: 'insights' },
    { label: 'Delete Profile', icon: 'fas fa-trash', route: 'delete' },
  ];
  constructor( private notificationService: NotificationService, private cookieService: CookieService) { }

  ngOnInit() {
    const token = this.cookieService.get('Token');
    if (token) {
      this.notificationService.startConnection(token);
    }
  }

}
