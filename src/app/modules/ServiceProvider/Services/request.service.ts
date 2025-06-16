// services/request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { PaginatedResponse, ServiceRequestDetails } from '../Models/service-request.model';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${environment.baseApi}ServiceRequest`;

  constructor(private http: HttpClient) { }

  getAcceptedRequests(pageSize: number = 5, pageNumber: number = 1): Observable<PaginatedResponse<ServiceRequestDetails>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<PaginatedResponse<ServiceRequestDetails>>(`${this.apiUrl}/AcceptedRequest`, { params });
  }
  getRequestById(requestId: Number): Observable<{ Data: ServiceRequestDetails }> {
    return this.http.get<{ Data: ServiceRequestDetails }>(`${this.apiUrl}/${requestId}`);
  }

}