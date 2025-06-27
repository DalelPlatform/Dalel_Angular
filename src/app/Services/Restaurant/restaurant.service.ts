import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRestaurant } from '../../modules/Restaurant/interfaces/irestaurant';

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

  getMenuItems(restaurantId: number): Observable<any> {
    return this.http.get(`${environment.baseApi}RestaurantMeal/GetMealsByRestaurantId/${restaurantId}`);
  }



}
