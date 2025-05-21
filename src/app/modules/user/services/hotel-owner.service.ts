import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HotelCreationRequest, ServiceResult } from '../../user/models/HotelCreationRequest.model';

@Injectable({ providedIn: 'root' })
export class HotelOwnerService {
  private apiUrl = 'http://localhost:5070/api/hotel-owner/';

  constructor(private http: HttpClient) {}

  addHotel(body: HotelCreationRequest) {
    return this.http.post<ServiceResult>(
      `${this.apiUrl}hotels`, 
      body
    );
  }

  // you can add getAllHotels(), updateHotel(), etc. as needed
}
