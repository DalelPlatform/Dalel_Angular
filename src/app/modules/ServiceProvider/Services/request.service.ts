// services/request.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { map } from 'rxjs/operators';
import { PaginatedResponse, ServiceRequestDetails } from '../Models/service-request.model';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = `${environment.baseApi}ServiceRequest`;
  constructor(private http: HttpClient, private cookieService: CookieService) {

  }

  getAcceptedRequests(pageSize: number = 5, pageNumber: number = 1): Observable<PaginatedResponse<ServiceRequestDetails>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<PaginatedResponse<ServiceRequestDetails>>(`${this.apiUrl}/AcceptedRequest`, { params });
  }
  getRequestById(requestId: Number): Observable<{ Data: ServiceRequestDetails }> {
    return this.http.get<{ Data: ServiceRequestDetails }>(`${this.apiUrl}/${requestId}`);
  }
  searchServiceRequests(
    title: string = '',
    description: string = '',
    address: string = '',
    sortBy: string = 'Date',
    descending: boolean = false,
    pageSize: number = 5,
    pageIndex: number = 1
  ) {
    const token = this.cookieService.get('Token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams()
      .set('Title', title)
      .set('Description', description)
      .set('Address', address)
      .set('sortBy', sortBy)
      .set('descending', descending)
      .set('pageSize', pageSize)
      .set('pageIndex', pageIndex);

    return this.http.get<any>(this.apiUrl, { headers, params });
  }
  // getRequests(Title: string, Description: string, Address: string): Observable<any> {
  //   const token = this.cookieService.get('Token');
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   const url = `${this.apiUrl}SearchServiceRequest/search?Title=${encodeURIComponent(Title)}&Description=${encodeURIComponent(Description)}&Address=${encodeURIComponent(Address)}`;

  //   return this.http.get(url, { headers });
  // }

    getRequests(Title: string, Description:string, Address: string, categoryId:number): Observable<any> {
    return this.http.get(`${this.apiUrl}/ServiceRequestSearch?Title=${Title}&Description=${Description}&Address=${Address}&CategoryId=${categoryId}`);
  }
  getCategories(): Observable<any> {
    return this.http.get(`http://localhost:5070/api/CategoryServices/categories`);
  }
  getRequestsByCategory(categoryId: number, pageSize: number = 5, pageNumber: number = 1): Observable<PaginatedResponse<ServiceRequestDetails>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http.get<PaginatedResponse<ServiceRequestDetails>>(`${this.apiUrl}/Category/${categoryId}`, { params });
  }
}