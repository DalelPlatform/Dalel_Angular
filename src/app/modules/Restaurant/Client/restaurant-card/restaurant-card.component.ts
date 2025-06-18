import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { IRestaurant } from '../../interfaces/irestaurant';

@Component({
  selector: 'app-restaurant-card',
  standalone: false,
  templateUrl: './restaurant-card.component.html',
  styleUrl: './restaurant-card.component.css'
})
export class RestaurantCardComponent {
  // @Input() restaurant : IRestaurant = {} as IRestaurant;
  @Input() restaurant !: IRestaurant ;


  @Output() restaurantDetails = new EventEmitter<number>();

  goToDetails(id: any) {
    this.restaurantDetails.emit(id);
  }
}
