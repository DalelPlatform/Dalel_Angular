import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthResponse } from '../models/auth-response.model'; 

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/Account'; // backend URL(Dummy لحد م اشوف الباك شغال على بورت كام)

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}/Register`, userData).pipe(
      map((response: AuthResponse) => {
        if (response && response.Success) {
          if (response.token) localStorage.setItem('token', response.token);
          if (response.role) localStorage.setItem('role', response.role);
        }
        return response;
      })
    );
  }

  login(credentials: { userName: string; password: string }): Observable<AuthResponse> {
    return this.http.post(`${this.apiUrl}/Login`, credentials).pipe(
      map((response: AuthResponse) => {
        if (response && response.Success) {
          if (response.token) localStorage.setItem('token', response.token);
          if (response.role) localStorage.setItem('role', response.role);
        }
        return response;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}