import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Schedule } from '../Models/schedule.model';


@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {
  private baseUrl = `${environment.baseApi}ServiceProvider`;
  private ScheduleURL = `${environment.baseApi}ServiceProviderSchedule`

  constructor(private http: HttpClient, private cookieService: CookieService) { }
  getAuthHeaders(): { [header: string]: string } {
    const token = this.cookieService.get('Token');
    return {
      'Authorization': `Bearer ${token}`
    };
  }

  searchProviders(paramsObj: {
    searchText?: string;
    categoryId?: number;
    address?: string;
    verificationStatus?: string;
    sortBy?: string;
    descending?: boolean;
    pageSize?: number;
    pageIndex?: number;
  }): Observable<any> {
    const params = new HttpParams({ fromObject: { ...paramsObj } });
    return this.http.get(`${this.baseUrl}/search`, { params });
  }
  getOwnProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/profile`, {
      headers: this.getAuthHeaders()
    });
  }
  getProviderById(id: string|null): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ProfileById`, {
    params: { id: id || '' } });
  }

  getByCategory(categoryId: number, pageSize = 5, pageNumber = 1): Observable<any> {
    return this.http.get(`${this.baseUrl}/category/${categoryId}`, {
      params: {
        pageSize,
        pageNumber
      }
    });
  }

  getTopRated(count = 5): Observable<any> {
    return this.http.get(`${this.baseUrl}/top-rated/${count}`);
  }

  providerExists(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/exists/${id}`);
  }

  updateServiceProvider(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.baseUrl}/UpdateServiceProfile`, formData, {
      headers: this.getAuthHeaders()
    });
  }
  loadSchedules(providerId: string) {
    return this.http.get<any>(`/api/ServiceProvider/schedules`, {
      params: { providerId }
    });
  }

  getSchedulesByProvider(providerId: string, pageSize: number = 7, pageNumber: number = 1): Observable<any> {
  const params = {
    providerId,
    pageSize: pageSize.toString(),
    pageNumber: pageNumber.toString()
  };

  return this.http.get<any>(`${this.ScheduleURL}/provider`, { params });
}

  updateSchedule(scheduleData: Schedule) {
  const token = this.cookieService.get("Token");
  const headers = new HttpHeaders(token);
  return this.http.put<any>(`${this.ScheduleURL}/update`, scheduleData, {headers});
  }


}
