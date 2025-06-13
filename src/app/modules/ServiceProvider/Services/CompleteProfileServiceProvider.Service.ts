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
  private apiUrl = 'http://localhost:5070/api/ServiceProvider/'; 

  constructor(private http: HttpClient, private cookieService: CookieService) { }


checkProfileCompletion(): Observable<boolean> {
  const token = this.cookieService.get('Token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  const fullUrl = this.apiUrl + 'check-profile';
  console.log('Request URL:', fullUrl); // لتسجيل URL
  return this.http.get<ProfileCheckResponse>(fullUrl, { headers }).pipe(
    map(response => {
      console.log('Response:', response); // لتسجيل الاستجابة الكاملة
      return response.Success ? response.Data === true : false;
    })
  );
}

  saveProfile(profile: FormData): Observable<any> {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl + '/create', profile, { headers });
  }
}
