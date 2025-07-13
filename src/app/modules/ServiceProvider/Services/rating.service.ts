import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../Models/review.model';
export interface ReviewsData {
  PageNumber: number;
  PageSize: number;
  TotalCount: number;
  Data: Review[];
}
export interface ReviewsResponse {
  Success: boolean;
  Message?: string;
  Data?: ReviewsData;
  StatusCode?: number;
}

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private http = inject(HttpClient);
  private apiUrl = "http://localhost:5070/api/ServiceProviderReview";

  getRatingsByProposal(proposalId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/proposal/${proposalId}`);
  }

  getAverageRating(providerId: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/provider/average`, {
      params: { providerId }
    });
  }

  getReviewsByProvider(
    providerId: string, 
    pageSize: number = 5, 
    pageNumber: number = 1
  ): Observable<any> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<any>(`${this.apiUrl}/provider/${providerId}`, { params });
  }
}