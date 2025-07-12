import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderProjectService {
  private baseUrl = 'http://localhost:5070/api/ServiceProviderProject';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('Token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createProject(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateProject`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  getProjectsByProvider(providerId: string, pageSize = 1000, pageNumber = 1): Observable<any> {
    const params = new HttpParams()
      .set('pageSize', pageSize)
      .set('pageNumber', pageNumber)
      .set('providerId', providerId);

    return this.http.get<any>(`${this.baseUrl}/provider`, { params });
  }

  getProjectById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  updateProject(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateProject?projectId=${id}`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DeleteProject?projectId=${id}`, {
      headers: this.getAuthHeaders()
    });
  }
}
