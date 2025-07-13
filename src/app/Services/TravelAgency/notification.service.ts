import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private hubConnection!: signalR.HubConnection;
  private notificationsSubject = new BehaviorSubject<any[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();
  private notifications: string[] = [];

  private apiUrl = `${environment.baseApi}`
  constructor(private http: HttpClient) { }


  startConnection(token: string) {
    console.log('Trying to start SignalR connection...');

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://localhost:5070/notificationHub', {
        accessTokenFactory: () => token
      })
      .withAutomaticReconnect()
      .build();

    this.registerOnServerEvents();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection Started'))
      .catch(err => console.error('SignalR Error: ', err));

    this.handleReconnect();
  }

  stopConnection() {
    if (this.hubConnection) {
      this.hubConnection.stop()
        .then(() => console.log('🔌 SignalR Connection Stopped'))
        .catch(err => console.error('Error stopping SignalR connection: ', err));
    }
  }

  private registerOnServerEvents(): void {
    this.hubConnection.on('ReceiveNotification', (notification: any) => {
      console.log('Notification Received:', notification);
      this.notifications = [notification, ...this.notifications];
      this.notificationsSubject.next(this.notifications);
    });
  }
  private handleReconnect(): void {
    this.hubConnection.onreconnected(() => {
      console.log('SignalR Reconnected Successfully.');
    });

    this.hubConnection.onclose(() => {
      console.warn('SignalR Connection Closed.');
    });
  }
 getNotifications(): Observable<any> {
    return this.http.get(`${this.apiUrl}Notifications`);
  }

  markAsRead(notificationId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}Notifications/${notificationId}/mark-as-read`, {});
  }
  
}
