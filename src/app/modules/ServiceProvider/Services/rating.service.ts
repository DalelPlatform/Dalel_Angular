import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}