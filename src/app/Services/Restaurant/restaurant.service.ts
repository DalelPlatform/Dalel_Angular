import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRestaurant } from '../../modules/Restaurant/interfaces/irestaurant';
import { SizeOfPiece } from '../../modules/Restaurant/interfaces/Enums/Meals/SizeOfPiece.enum';
import { FoodCategory } from '../../modules/Restaurant/interfaces/Enums/Meals/FoodCategory.enum';
import { IMeal } from '../../modules/Restaurant/interfaces/IMeal';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  http = inject(HttpClient)
  // private addRestaurantForm = new BehaviorSubject<number>(0);
  constructor() { }


    addRestaurant(data: any): Observable<any> {

    return this.http.post(`${environment.baseApi}Restaurant/AddRestaurant`, data);
  }

  getAllRestaurant(): Observable<any> {

    return this.http.get(`${environment.baseApi}Restaurant/GetAllRestaurants`);
  }

  addMeal(data: any): Observable<any> {

    return this.http.post(`${environment.baseApi}RestaurantMeal/AddMeal`, data);
  }

  getRestaurant(restaurantName: string , city : string , region : string , address : string , street : string): Observable<any> {
    return this.http.get(`${environment.baseApi}Restaurant/search?searchText=${restaurantName}&city=${city}&region=${region}&address=${address}&street=${street}`);
  }


  getRestaurantDetails(id: number): Observable<any> {
    return this.http.get(`${environment.baseApi}Restaurant/${id}`);
  }

  getMenuItemsById(restaurantId: number): Observable<any> {
    return this.http.get(`${environment.baseApi}RestaurantMeal/GetMealsByRestaurantId/${restaurantId}`);
  }

  getMenuItems(): Observable<any>{
    return this.http.get(`${environment.baseApi}RestaurantMeal/GetAllMeals`)
  }

  SearchMeal(searchText: string): Observable<any> {
    return this.http.get(`${environment.baseApi}RestaurantMeal/search?searchText=${searchText}`);
  }

  FilterMeal(params : HttpParams ): Observable<any> {

    return this.http.get(`${environment.baseApi}RestaurantMeal/search` , { params });
  }

  getMealById(mealId: number): Observable<any> {
    return this.http.get(`${environment.baseApi}RestaurantMeal/GetMeal/${mealId}`);
  }

  SearchMealType(type: FoodCategory): Observable<any> {
    return this.http.get(`${environment.baseApi}RestaurantMeal/GetMealCategory?category=${type}`);
  }


AddToCart(meal: IMeal, quantity: number = 1): Observable<any> {
  const supPrice = quantity * meal.Price;

  const body = {
    RestaurantMenuItemId: meal.Id,
    SupPrice: supPrice,
    Quantity: quantity
  };
  console.log(body);

  return this.http.post(`${environment.baseApi}RestaurantCartItem/AddToCart`, body);
}

  getCartItems(): Observable<any> {
    return this.http.get(`${environment.baseApi}RestaurantCartItem/GetCartItems`);
  }

  removeFromCart(cartItemId: number): Observable<any> {
    return this.http.delete(`${environment.baseApi}RestaurantCartItem/DeleteCartItem/${cartItemId}`);
  }

  updateCartItem(cartItemId: number, quantity: number, price: number): Observable<any> {
  const body = {
    Quantity: quantity,
    SupPrice: quantity * price
  };

  return this.http.put(`${environment.baseApi}RestaurantCartItem/EditCartItem/${cartItemId}`, body);
}






}
