import { Component, inject, OnInit } from '@angular/core';
import { IMeal } from '../../interfaces/IMeal';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';
import { SizeOfPiece } from '../../interfaces/Enums/Meals/SizeOfPiece.enum';
import { AvailabilityStatus } from '../../interfaces/Enums/Meals/AvailabilityStatus.enum';
import { HttpParams } from '@angular/common/http';
import { FoodCategory } from '../../interfaces/Enums/Meals/FoodCategory.enum';
import { RestaurantType } from '../../interfaces/Enums/Restaurant/RestaurantType.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuItems',
  templateUrl: './menuItems.component.html',
  styleUrls: ['./menuItems.component.css'],
  standalone: false
})
export class MenuItemsComponent implements OnInit {

  // Injecting the Router service to navigate to meal details
  private router = inject(Router);
  menu: IMeal[] = []



  isSearching: boolean = false;
  selectedSizes: SizeOfPiece[] = [];
  AvailabilityStatus: AvailabilityStatus[] = [];
  foodCategory: FoodCategory[] = [];



  constructor(private service: RestaurantService) {

  }

  ngOnInit() {
    this.getMenu();
    this.getEnumAvailabilityStatus("sdf");
    // this.getTokenFromCookie();
  }


  getEnumSizeOfPiece(size: string): SizeOfPiece {
    return SizeOfPiece[size as keyof typeof SizeOfPiece];
  }
  getEnumAvailabilityStatus(status: string): AvailabilityStatus {
    return AvailabilityStatus[status as keyof typeof AvailabilityStatus];
  }

  getEnumFoodCategory(category: string): FoodCategory {
    return FoodCategory[category as keyof typeof FoodCategory];
  }
  getEnumRestaurantType(type: string): RestaurantType {
    return RestaurantType[type as keyof typeof RestaurantType];
  }


  getMenu() {
    this.service.getMenuItems().subscribe({
      next: (res) => {
        // console.log("there is getMenuItems")
        // console.log(res.Data);
        this.menu = res.Data;
        console.log(`this is res : ${res}`)
        // console.log(this.menu)
      },
      error: (err) => {
        console.log("Error fetching menu items:");
        console.log(err);
      }
    })
  }



  onSearch(mealName: string) {
    this.isSearching = true;

    console.log(mealName);
    this.service.SearchMeal(mealName).subscribe({
      next: (res) => {
        this.menu = res.Data.Data;
        // console.log("there is SearchMeal");
        // console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSizeOfPiece(value: string, checked: boolean) {
    const enumValue = this.getEnumSizeOfPiece(value);

    if (checked) {
      // Add to selected list
      if (!this.selectedSizes.includes(enumValue)) {
        this.selectedSizes.push(enumValue);
      }
    } else {
      // Remove from selected list
      this.selectedSizes = this.selectedSizes.filter(size => size !== enumValue);
    }

    // Call filter method
    // this.MenuFilter();
  }

  onCategoryFood(value: string, checked: boolean) {
    const enumValue = this.getEnumFoodCategory(value);

    if (checked) {
      // Add to selected list
      if (!this.foodCategory.includes(enumValue)) {
        this.foodCategory.push(enumValue);
      }
    } else {
      // Remove from selected list
      this.foodCategory = this.foodCategory.filter(size => size !== enumValue);
    }

    // Call filter method
    // this.MenuFilter();
  }


  onAvailableStatus(value: string, checked: boolean) {
    const enumValue = this.getEnumAvailabilityStatus(value);

    if (checked) {
      // Add to selected list
      if (!this.AvailabilityStatus.includes(enumValue)) {
        this.AvailabilityStatus.push(enumValue);
      }
    } else {
      // Remove from selected list
      this.AvailabilityStatus = this.AvailabilityStatus.filter(size => size !== enumValue);
    }

    // Call filter method
    // this.MenuFilter();
  }





  //price
  minValue: number = 0;
  maxValue: number = 100;
  minPercent: number = 0;
  maxPercent: number = 100;


  onPriceChange(min: number, max: number): void {
    this.minValue = +min;
    this.maxValue = +max;

    this.minPercent = this.minValue;
    this.maxPercent = this.maxValue;

    // Optional: update progress bar here if needed

    // Call filter method
    // this.MenuFilter();
  }
  //duration
  duration: number | null = null;

  onDurationChange(value: number) {
    this.duration = value;
    // console.log(`duration = ${this.duration}`)

  }

  //page size
  currentPage: number = 1; // Initialize current page
  pageSize: number | null = null;
  onPageSizeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const value = parseInt(selectElement.value, 10);
    this.pageSize = value;
    // console.log(`pageSize = ${this.pageSize}`);
  }


  //Restaurant Type
  restaurantType: RestaurantType[] = [];
  onRestaurantTypeChange(value: string, checked: boolean) {
    const enumValue = this.getEnumRestaurantType(value);
    if (checked) {
      // Add to selected list
      if (!this.restaurantType.includes(enumValue)) {
        this.restaurantType.push(enumValue);
      }
    } else {
      // Remove from selected list
      this.restaurantType = this.restaurantType.filter(size => size !== enumValue);
    }

    // Call filter method
    // this.MenuFilter();

  }



  applyFilters() {
    this.MenuFilter();
  }

  clearAllFilters() {
    this.selectedSizes = [];
    this.AvailabilityStatus = [];
    this.foodCategory = [];
    this.minValue = 0;
    this.maxValue = 100;
    this.duration = null;
    this.pageSize = null;
    this.restaurantType = [];

    // Reset the search input
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    if (searchInput) {
      searchInput.value = '';
    }

    // Call filter method to refresh the menu

  }





  MenuFilter() {
    let params = new HttpParams();

    // Size of Piece
    if (this.selectedSizes.length > 0) {
      this.selectedSizes.forEach(size => {
        params = params.append('sizeOfPiece', size.toString());
      });
    }


    // Availability Status
    if (this.AvailabilityStatus.length > 0) {
      this.AvailabilityStatus.forEach(size => {
        params = params.append('availabilityStatus', size.toString());
      });
    }


    // Food Category
    if (this.foodCategory.length > 0) {
      this.foodCategory.forEach(size => {
        params = params.append('foodCategory', size.toString());
      });
    }


    //  Price (sent as string but parsed as float in backend)
    params = params.append('minPrice', this.minValue.toFixed(2));
    params = params.append('maxPrice', this.maxValue.toFixed(2));

    // Duration (sent as string but parsed as int in backend)
    if (this.duration !== null) {
      params = params.append('duration', this.duration.toFixed(2));
    }

    // Page Size (sent as string but parsed as int in backend)
    if (this.pageSize !== null) {
      params = params.append('pageSize', this.pageSize.toString());
    }
    // Restaurant Type
    if (this.restaurantType.length > 0) {
      this.restaurantType.forEach(type => {
        params = params.append('restaurantType', type.toString());
      });
    }

    this.service.FilterMeal(params).subscribe({
      next: (res) => {
        this.menu = res.Data.Data;
        // this.pagination = res.Data;
        console.log("Filtered Meals:", res);
        console.log(res)
      },
      error: (err) => {
        console.error(err);
      }
    });
  }



  onMealClick(meal: IMeal) {
    console.log("Meal clicked:", meal);
    console.log("Meal clicked:", meal.Id);

    // Navigate to meal details or perform any other action

    this.router.navigate(['restaurant/client/meal-details/', meal.Id]);

  }


  getTokenFromCookie(): string | null {
    const name = 'Token=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for (let c of cookies) {
      while (c.charAt(0) === ' ') c = c.substring(1);
      if (c.indexOf(name) === 0) {
        const token = c.substring(name.length, c.length);
        console.log('Token from cookie:', token); // ✅ Print token
        return token;
      }
    }
    console.log('No token found in cookie');
    return null;
  }


}
