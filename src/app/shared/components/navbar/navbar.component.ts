import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../Services/TravelAgency/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone:false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
isNotificationOpen = false;
notifications: any[] = [];
isLoggedIn: boolean = false;
 currentUrl: string = '';
constructor(private notificationService: NotificationService, private cookieService: CookieService, private router: Router,
      private toastr: ToastrService,){}
  ngOnInit() {
    this.loadNotifications();
    const Token= this.cookieService.get('Token')
     if (Token) {
    this.isLoggedIn = true;
    
  }
  this.currentUrl = this.router.url;
  console.log('Current URL on init:', this.currentUrl);

  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }
  isInAgancyClient(): boolean {
    return this.currentUrl.startsWith('/agancy/client');

  }
toggleNotifications() {
  this.isNotificationOpen = !this.isNotificationOpen;
  if (this.isNotificationOpen) {
    this.loadNotifications();
  }
}
loadNotifications() {
  this.notificationService.getNotifications().subscribe( {
      next: (res) => {
        this.notifications = res;
    console.log("Notifications loaded:", this.notifications); 
        
      }
      , error: (err) => {
        if (err.status === 401) {
          this.toastr.error('Unauthorized access');
          this.router.navigate(['/login']);
        }
      } 


    })
}
  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.Id !== id);
     console.log('Notification marked as read:', this.notifications );
    });
  }
  getBookingId(message: string): number {
  const match = message.match(/BookingId:(\d+)/);
  console.log("Extracted BookingId:", match ? +match[1] : 0);
  return match ? +match[1] : 0;
}
}
