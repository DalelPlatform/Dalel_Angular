import { Injectable } from '@angular/core';
import { IUserRegister } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5070/api/Account/'; 

  constructor(private http: HttpClient) { }

  Login(UserNameOrEmail: string, Password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'Login', { UserNameOrEmail, Password }, { headers });
  }

  // Register
  Register(user: IUserRegister): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'Register', user, { headers });
  }

  Logout(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'Signout', {}, { headers });
  }
  CheckUsername(username: string): Observable<any> {
    return this.http.get(this.apiUrl + 'CheckUsername', {
      params: { username }
    });
  }
  
  CheckEmail(email: string): Observable<any> {
    return this.http.get(this.apiUrl + 'CheckEmail', {
      params: { email }
    });
  }
  
  CheckNationalId(nationalId: string): Observable<any> {
    return this.http.get(this.apiUrl + 'CheckNationalId', {
      params: { nationalId }
    });
  }

  getRole(): string {
    const match = document.cookie.match(new RegExp('(^| )userRole=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : '';
  }
  
  getUserProfile(): Observable<IUserRegister> {
    return this.http.get<IUserRegister>(`${this.apiUrl}/test`);
  }

  updateUserProfile(userData: Partial<IUserRegister>): Observable<IUserRegister> {
    return this.http.put<IUserRegister>(`${this.apiUrl}/test`, userData);
  }


}