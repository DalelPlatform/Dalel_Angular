import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import { BookingStatus } from '../../modules/Property/Models/enums/BookingStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class PropertyOwnerService {

  constructor(private http: HttpClient) {}


  registerProperty(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.baseApi}Property/Property`, data, { headers });
  }



  getProperties(searchText: string, city:string): Observable<any> {

    return this.http.get(`${environment.baseApi}Property/search?searchText=${searchText}&city=${city}`);
  }

  updateProperty(data: any, id: number): Observable<any> {
    return this.http.put(`${environment.baseApi}Property/${id}`, data);
  }

  DeleteProperty(id: number): Observable<any> {
    return this.http.delete(`${environment.baseApi}Property/delete-property/${id}`);
  }

  getListings(): Observable<any> {
    return this.http.get(`${environment.baseApi}Property/get-listings`);
  }


  getProperty(id:number): Observable<any> {

    return this.http.get(`${environment.baseApi}Property/${id}`);
  }

  getBookingByStatus(status:BookingStatus): Observable<any> {
    return this.http.get(`${environment.baseApi}Property/get-bookings?status=${status}`);
  }

  getAllBookings(): Observable<any> {
    return this.http.get(`${environment.baseApi}Property/get-all-bookings`);
  }

  getAllReviews(): Observable<any> {
    return this.http.get(`${environment.baseApi}Property/get-all-reviews`);
  }

  bookProperty(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log("JWT token:", token);
    console.log("Data being sent:", data);
    return this.http.post(`${environment.baseApi}Property/Booking`, data, { headers });
  }
  addPayment(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${environment.baseApi}Property/Payment`, data, { headers });

  }

  }
