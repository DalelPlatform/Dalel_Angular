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

  getProperties(data: any): Observable<any> {
    
    return this.http.get(`${environment.baseApi}Property/search`, data);
  }

}
