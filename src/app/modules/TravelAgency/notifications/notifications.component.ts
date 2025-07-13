import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../Services/TravelAgency/notification.service';
import { not } from 'rxjs/internal/util/not';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  standalone: false
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService, private cookieService: CookieService) { }

  ngOnInit() {
    // const token = this.cookieService.get('Token');
    // this.notificationService.startConnection(token);

  
    this.notificationService.getNotifications().subscribe((data: any) => {
    
      this.notifications = data.map((notif: any) => ({
    id: notif.Id,
    message: notif.Message,
    isRead: notif.IsRead,
    createdAt: notif.CreatedAt
  }));
        console.log("testingdata",this.notifications)
    });


    this.notificationService.notifications$.subscribe(notifs => {
      const newNotif = notifs[0];
      this.notifications = [newNotif, ...this.notifications];
    });
  }

  markAsRead(id: number) {
    this.notificationService.markAsRead(id).subscribe(() => {
      this.notifications = this.notifications.filter(n => n.id !== id);
    });
  }
}
