import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}
interface ServiceRequest {
  id?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
  private apiUrl = `${environment.baseApi}ServiceRequest`;

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }
  getCategories(): Observable<any> {
    return this.http.get(`http://localhost:5070/api/CategoryServices/categories`);
  }
  // Create a service request
  createServiceRequest(requestData: FormData): Observable<ApiResponse<ServiceRequest>> {
    return this.http
      .post<ApiResponse<ServiceRequest>>(`${this.apiUrl}/create`, requestData, {
        headers: this.getAuthHeaders(),
        withCredentials: true 
      })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to create service request');
          }
          return response;
        }),
        catchError(error => {
          console.error('Create Service Request Error:', error);
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }

  // Get a service request by ID
  getServiceRequestById(id: number): Observable<ApiResponse<ServiceRequest>> {
    return this.http
      .get<ApiResponse<ServiceRequest>>(`${this.apiUrl}/${id}`, {
        headers: this.getAuthHeaders()
      })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to fetch service request');
          }
          return response;
        }),
        catchError(error => {
          console.error('Get Service Request Error:', error);
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }

  getRequestsByClient(pageSize: number = 5, pageNumber: number = 1): Observable<ApiResponse<ServiceRequest[]>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http
      .get<ApiResponse<ServiceRequest[]>>(`${this.apiUrl}/client`, {
        headers: this.getAuthHeaders(),
        params,
        withCredentials: true
      })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to fetch client requests');
          }
          return response;
        }),
        catchError(error => {
          console.error('Get Client Requests Error:', error);
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }

  getRequestsByStatus(status: string, pageSize: number = 5, pageNumber: number = 1): Observable<ApiResponse<ServiceRequest[]>> {
    const params = new HttpParams()
      .set('pageSize', pageSize.toString())
      .set('pageNumber', pageNumber.toString());

    return this.http
      .get<ApiResponse<ServiceRequest[]>>(`${this.apiUrl}/status/${status}`, {
        headers: this.getAuthHeaders(),
        params,
        withCredentials: true
      })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to fetch requests by status');
          }
          return response;
        }),
        catchError(error => {
          console.error('Get Requests by Status Error:', error);
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }

  updateServiceRequest(id: number, requestData: FormData): Observable<ApiResponse<ServiceRequest>> {
    return this.http
      .put<ApiResponse<ServiceRequest>>(`${this.apiUrl}/${id}`, requestData, {
        headers: this.getAuthHeaders(),
        withCredentials: true
      })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to update service request');
          }
          return response;
        }),
        catchError(error => {
          console.error('Update Service Request Error:', error);
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }

  deleteServiceRequest(id: number): Observable<ApiResponse<void>> {
    return this.http
      .delete<ApiResponse<void>>(`${this.apiUrl}/${id}`, {
        headers: this.getAuthHeaders(),
        withCredentials: true
      })
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to delete service request');
          }
          return response;
        }),
        catchError(error => {
          console.error('Delete Service Request Error:', error);
          return throwError(() => new Error(error.message || 'Server error'));
        })
      );
  }
}