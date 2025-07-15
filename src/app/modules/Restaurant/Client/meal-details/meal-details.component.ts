import { Component, inject, Input, OnInit } from '@angular/core';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { ActivatedRoute } from '@angular/router';
import { IMeal } from '../../interfaces/IMeal';
import { FoodCategory } from '../../interfaces/Enums/Meals/FoodCategory.enum';


@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
  standalone: false,
})
export class MealDetailsComponent implements OnInit {

  // @Input() meal !: IMeal;
  private route = inject(ActivatedRoute);
  meal !: IMeal ;
  meals: IMeal[] = []
  // @Input() mealId !: number;

  mealId !: number;

  selectedImageIndex: number = 0;
  quantity: number = 1;


  constructor(private service: RestaurantService) { }

  ngOnInit() {
    // You can perform any initialization logic here

    this.mealId = Number(this.route.snapshot.paramMap.get('id'));
    this.getMealById(this.mealId);
    // console.log(this.meal.FoodCategory);
    // this.getMealType(this.meal?.FoodCategory); // Default to Other if not set




  }

  changeQuantity(change: number) {
    const newQuantity = this.quantity + change;
    if (newQuantity < 1) {
      this.quantity = 1;
    } else {
      this.quantity = newQuantity;
    }
  }

  onclick(){
        console.log("Meal Details Component Initialized with meal:", this.mealId);

  }


  getMealById(mealId: number) {
    this.service.getMealById(mealId).subscribe({
      next: (res) => {
        console.log("Meal details fetched:", res.Data);

        this.meal = res.Data;
        this.getMealType(this.meal.FoodCategory);
      },
      error: (error) => {
        console.error("Error fetching meal details:", error);
      }
    });

  }

  //category :
  getCategory() :string{
    switch (this.meal.FoodCategory) {
      case FoodCategory.Appetizer:
        return "Appetizer";
      case FoodCategory.MainCourse:
        return "Main Course";
      case FoodCategory.Dessert:
        return "Dessert";
      case FoodCategory.Beverage:
        return "Beverage";
      case FoodCategory.Other:
        return "Other";
      default:
        return "Unknown Category";
    }
  }
  getMealType(type: FoodCategory) {

    this.service.SearchMealType(type).subscribe({
      next: (res) => {
        console.log("Meal type fetched:", res);
        this.meals = res;
      },
      error: (error) => {
        console.error("Error fetching meal type:", error);
      }
    });
  }



   addToCart(meal: IMeal) {
    this.service.AddToCart(meal).subscribe({
      next: (res) => {
        console.log('Meal added to cart successfully:', res);
      },
      error: (error) => {
        console.error('Error adding meal to cart:', error);
      }
    });
  }


}
