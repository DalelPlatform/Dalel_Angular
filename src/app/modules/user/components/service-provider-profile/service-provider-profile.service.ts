import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderProfileService {
  private apiUrl = 'api/serviceprovider'; // صححنا الـ URL

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  checkProfileCompletion(): Observable<boolean> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<boolean>(`${this.apiUrl}/check-profile`, { headers });
  }

  saveProfile(profile: FormData): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl + '/create', profile, { headers });
  }
}
