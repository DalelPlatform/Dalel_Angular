import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProposalService {
  private apiUrl = `${environment.baseApi}ServiceProviderProposal`;

  constructor(private http: HttpClient) { }

  createProposal(proposalData: any): Observable<any> {
    const formData = new FormData();
    formData.append('description', proposalData.description);
    formData.append('suggestedPrice', proposalData.suggestedPrice);
    formData.append('serviceRequestId', proposalData.serviceRequestId);

    return this.http.post(`${this.apiUrl}/create`, formData);
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
    return this.http.put(`${this.apiUrl}/${id}`, proposalData);
  }

  acceptProposal(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/accept/${id}`, {});
  }

  rejectProposal(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reject/${id}`, {});
  }

  cancelProposals(serviceRequestId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/cancel/${serviceRequestId}`, {});
  }

  deleteProposal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProviderStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/provider/stats`);
  }


}