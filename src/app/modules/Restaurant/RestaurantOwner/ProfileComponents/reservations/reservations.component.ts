import { Component, OnInit } from '@angular/core';
import { IRestaurantOrder } from '../../../interfaces/IRestaurantOrder';
import { OrderStatus } from '../../../interfaces/Enums/Restaurant/OrderStatus.enum';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
  standalone: false,
})
export class ReservationsComponent implements OnInit {
  activeTab: 'upcoming' | 'canceled' | 'completed' = 'upcoming';

  orders: IRestaurantOrder[] = [];

  constructor() {}

  get filteredOrders() {
    if (this.activeTab === 'upcoming') {
      // Pending and Confirmed are considered upcoming
      return this.orders.filter(o => o.OrderStatus === OrderStatus.Pending || o.OrderStatus === OrderStatus.Confirmed || o.OrderStatus === OrderStatus.Preparing || o.OrderStatus === OrderStatus.OnTheWay);
    }
    if (this.activeTab === 'canceled') {
      return this.orders.filter(o => o.OrderStatus === OrderStatus.Rejected);
    }
    if (this.activeTab === 'completed') {
      // You can adjust this if you have a completed status
      return [];
    }
    return this.orders;
  }

  setTab(tab: 'upcoming' | 'canceled' | 'completed') {
    this.activeTab = tab;
  }

  ngOnInit() {
    this.setTab('upcoming');
    // TODO: Replace with service call
    this.orders = [
      {
        Id: 1,
        Date: new Date(),
        TotalPrice: 150,
        OrderStatus: OrderStatus.Pending,
        RestaurantId: 101,
        ClientId: 'C001',
        RestaurantName: 'Pizza Place',
        ClientName: 'John Doe',
      },
      {
        Id: 2,
        Date: new Date(),
        TotalPrice: 200,
        OrderStatus: OrderStatus.Confirmed,
        RestaurantId: 102,
        ClientId: 'C002',
        RestaurantName: 'Burger House',
        ClientName: 'Jane Smith',
      },
      {
        Id: 3,
        Date: new Date(),
        TotalPrice: 120,
        OrderStatus: OrderStatus.Rejected,
        RestaurantId: 103,
        ClientId: 'C003',
        RestaurantName: 'Sushi Bar',
        ClientName: 'Alice Brown',
      }
    ];
  }
}
