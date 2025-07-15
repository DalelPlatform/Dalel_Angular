import { Component, Input, OnInit } from '@angular/core';
import { IMeal } from '../../interfaces/IMeal';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.css'],
  standalone: false
})
export class MealCardComponent implements OnInit {

  @Input() meal: IMeal = {} as IMeal;
  constructor(private restaurantService: RestaurantService , private router: Router) { }

  ngOnInit() {
  }



    onMealClick(meal: IMeal) {
    console.log("Meal clicked:", meal);
    console.log("Meal clicked:", meal.Id);

    // Navigate to meal details or perform any other action

    this.router.navigate(['restaurant/client/meal-details/', meal.Id]);

  }

  addToCart(meal: IMeal) {
    this.restaurantService.AddToCart(meal).subscribe({
      next: (res) => {
        console.log('Meal added to cart successfully:', res);
      },
      error: (error) => {
        console.error('Error adding meal to cart:', error);
      }
    });
  }

  }

