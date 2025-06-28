import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

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

<<<<<<< HEAD
  getProperties(data: any ): Observable<any> {

    return this.http.get(`${environment.baseApi}Property/search`, data);
=======
  getProperties(searchText: string, city:string): Observable<any> {

    return this.http.get(`${environment.baseApi}Property/search?searchText=${searchText}&city=${city}`);
  }

  
  getProperty(id:number): Observable<any> {

    return this.http.get(`${environment.baseApi}Property/${id}`);
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
>>>>>>> e452ba9e5e985e7602068518e963b20d4656c654
  }

}
