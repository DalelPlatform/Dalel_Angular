import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class CompleteProfileServiceProviderService {
  private apiUrl = 'http://localhost:5070/api/Serviceprovider/'; 

  constructor(private http: HttpClient, private cookieService: CookieService) { }

checkProfileCompletion(): Observable<boolean> {
  const token = this.cookieService.get('Token');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.http.get<any>(this.apiUrl+'check-profile', { headers }).pipe(
    map(response => {
      return response.Success && response.Data === true;
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
