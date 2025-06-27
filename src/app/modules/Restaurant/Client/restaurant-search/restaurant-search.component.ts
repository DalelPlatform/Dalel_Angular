import { Component, inject } from '@angular/core';
import { IRestaurant } from '../../interfaces/irestaurant';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restaurant-search',
  standalone: false,
  templateUrl: './restaurant-search.component.html',
  styleUrl: './restaurant-search.component.css'
})
export class RestaurantSearchComponent {
list : IRestaurant[] = [];
router = inject(Router);

constructor(private service:RestaurantService) {}
searchRestaurants(restaurantName: string ,city:string , region : string ,address:string ,street:string ) {
    this.service.getRestaurant(restaurantName , city , region ,address , street ).subscribe({
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

goToDetails(id : number){
  console.log(id);
  const restaurant = this.list.find(r => r.Id === id);
  this.router.navigate(['restaurant/client/restaurant-details', id]);



}


  clearSearch(restaurantName: string,city:string, region : string,address:string,street:string ) {
    restaurantName = '' ,
    city = '',
    region = '',
    address = '',
    street = ''
  }
}
