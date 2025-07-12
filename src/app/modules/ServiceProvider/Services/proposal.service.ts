import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = `${environment.baseApi}ServiceProviderProposal`;
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  createProposal(proposalData: any): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const formData = new FormData();
    formData.append('description', proposalData.description);
    formData.append('suggestedPrice', proposalData.suggestedPrice);
    formData.append('serviceRequestId', proposalData.serviceRequestId);

    return this.http.post(`${this.apiUrl}/create`, formData, { headers });
  }

  getProposalsByRequest(requestId: number, pageSize = 5, pageNumber = 1): Observable<any> {

    return this.http.get(`${this.apiUrl}/request/${requestId}`, {
      params: { pageSize, pageNumber }
    });
  }

  getProposalsByProvider(pageSize = 5, pageNumber = 1): Observable<any> {
    return this.http.get(`${this.apiUrl}/provider`, {
      params: { pageSize, pageNumber }
    });
  }

  getProposalById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateProposal(id: number, proposalData: any): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/${id}`, proposalData, { headers });
  }

  acceptProposal(id: number): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/accept/${id}`, { headers });
  }

  rejectProposal(id: number): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/reject/${id}`, { headers });
  }

  cancelProposals(serviceRequestId: number): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/cancel/${serviceRequestId}`, { headers });
  }

  deleteProposal(id: number): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  getProviderStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/provider/stats`);
  }
  createReview(model: any): Observable<any> {
    return this.http.post<any>('/api/reviews', model);
  }
  completeProposal(id: number): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}/complete/${id}`, { headers });
  }
}