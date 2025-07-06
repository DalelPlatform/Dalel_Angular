import { Component, inject, Input, OnInit } from '@angular/core';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { IMeal } from '../../interfaces/IMeal';


@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
  standalone: false,
})
export class MealDetailsComponent implements OnInit {

  // @Input() meal !: IMeal;
  private route = inject(ActivatedRoute);
  meal!: IMeal;
  @Input() mealId !: number;



  constructor(private service: RestaurantService) { }

  ngOnInit() {
    // You can perform any initialization logic here

    this.mealId = Number(this.route.snapshot.paramMap.get('id'));
    console.log("Meal Details Component Initialized with meal:", this.mealId);
    this.getMealById();


  }


  getMealById() {
    this.service.getMealById(this.mealId).subscribe({
      next: (res) => {
        console.log("Meal details fetched:", res);
        this.meal = res;
      },
      error: (error) => {
        console.error("Error fetching meal details:", error);
      }
    });

  }

}
