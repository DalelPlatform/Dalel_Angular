import { Component } from '@angular/core';
import { IRestaurant } from '../../interfaces/irestaurant';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';

@Component({
  selector: 'app-restaurant-search',
  standalone: false,
  templateUrl: './restaurant-search.component.html',
  styleUrl: './restaurant-search.component.css'
})
export class RestaurantSearchComponent {
list : IRestaurant[] = [];

constructor(private service:RestaurantService) {}
  SearchText(value:string){
    this.service.getRestaurant(value).subscribe({
      next: (res) => {
        this.list = res.Data.Data;
        console.log(res.Data);
        console.log(res.Data.Data[0].Description);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
