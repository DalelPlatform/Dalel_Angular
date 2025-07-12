import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


// Define the ProfileCheckResponse interface
interface ProfileCheckResponse {
  Success: boolean;
  Data?: boolean;
  Message: string;
}


@Injectable({
  providedIn: 'root'
})
export class CompleteProfileServiceProviderService {
  private apiUrl = 'http://localhost:5070/api/';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  private get authHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('Token')}`
    });
  }
  checkProfileCompletion(): Observable<boolean> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const fullUrl = `${this.apiUrl}ServiceProvider/check-profile`;
    console.log('Request URL:', fullUrl);
    return this.http.get<ProfileCheckResponse>(fullUrl, { headers }).pipe(
      map(response => {
        console.log('Response:', response);
        return response.Success ? response.Data === true : false;
      })
    );
  }
  createServiceProvider(formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}ServiceProvider/create`, formData, {
      headers: this.authHeaders
    });
  }
  getCategories(): Observable<any> {
    return this.http.get(`http://localhost:5070/api/CategoryServices/categories`);
  }

  updateSchedules(scheduleData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}serviceproviderschedule/update`,scheduleData, {
      headers: this.authHeaders
    });
  }
   AddSchedules(scheduleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}ServiceProviderSchedule/add`,scheduleData, {
      headers: this.authHeaders
    });
  }
  loadSchedules(): Observable<any> {
    return this.http.get(`${this.apiUrl}serviceproviderschedule/provider`, {
      headers: this.authHeaders,
      params: { pageSize: '5', pageNumber: '1' },
      responseType: 'text'
    });
  }

  saveProfile(profile: FormData): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl + 'create', profile, { headers });
  }
}
