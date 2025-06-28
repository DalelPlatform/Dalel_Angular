import { Component, EventEmitter, inject, Input, input, Output, output } from '@angular/core';
import { IRestaurant } from '../../interfaces/irestaurant';
import { Router } from '@angular/router';

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
  router = inject(Router);
  goToDetails(id: number) {
    this.restaurantDetails.emit(id);

    // console.log(id);
    // this.router.navigate(['restaurant/client/restaurant-details', id]);
    // console.log(this.restaurant);


  }
}
