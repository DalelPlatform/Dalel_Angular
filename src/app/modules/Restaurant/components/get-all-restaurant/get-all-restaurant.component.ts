import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service'; // adjust the path as needed
import { routes } from '../../../../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-all-restaurant',
  templateUrl: './get-all-restaurant.component.html',
  styleUrl: './get-all-restaurant.component.css',
})
export class GetAllRestaurantComponent implements OnInit {
  restaurants: any[] = [];
  constructor(private resturantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this.resturantService.getAllRestaurant().subscribe({
      next: (res) => {
        console.log(res);
        this.restaurants = res.Data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }




  goToDetails(id: any) {

    // Navigate to the details page
    this.router.navigate(['Restaurant/owner/restaurant-details', id]);
    this.resturantService.getRestaurantDetails(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
