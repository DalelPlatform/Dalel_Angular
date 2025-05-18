import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceProviderProfile } from './models/service-provider-profile.model';
//محتاجة تعدلي ال url بتاعها
@Injectable({
  providedIn: 'root'
})
export class ServiceProviderProfileService {
  private apiUrl = 'api/service-provider/profile';

  constructor(private http: HttpClient) { }

  checkProfileCompletion(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-completion`);
  }

  saveProfile(profile: FormData): Observable<any> {
    return this.http.post(this.apiUrl, profile);
  }
}