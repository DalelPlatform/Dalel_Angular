import { Injectable } from '@angular/core';
import { IUserRegister } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators';
import {
  ChangePasswordRequest, ChangePasswordResponse
} from '../models/change-password.model';
import {
  ForgotPasswordRequest, ForgotPasswordResponse
} from '../models/forgot-password.model';
import {
  ResetPasswordRequest, ResetPasswordResponse
} from '../models/reset-password.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://localhost:5070/api/Account/';
  private isFirstLogin = new BehaviorSubject<boolean>(false);
  isFirstLogin$ = this.isFirstLogin.asObservable(); 

  constructor(private http: HttpClient) { }

  Login(UserNameOrEmail: string, Password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'Login', { UserNameOrEmail, Password }, { headers })
    .pipe(
      tap(response =>{
        if (response) { // response.IsFirstLogin
          this.isFirstLogin.next(true);
        } 
      })
    )
    ;
  }

  // Register
  Register(user: IUserRegister): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'Register', user, { headers });
  }

  Logout(): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl + 'Signout', {}, { headers })
    .pipe(
      tap(() => {
        this.isFirstLogin.next(false);
      })
    );
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
    return this.http.put<IUserRegister>(`${this.apiUrl}/test`, userData)
    .pipe(
        tap(() => this.isFirstLogin.next(false)) 
      );
  }
  changePassword(body: ChangePasswordRequest): Observable<ChangePasswordResponse> {
    return this.http.post<ChangePasswordResponse>(
      `${this.apiUrl}ChangePassword`, body
    );
  }

  forgotPassword(body: ForgotPasswordRequest): Observable<ForgotPasswordResponse> {
    return this.http.post<ForgotPasswordResponse>(
      `${this.apiUrl}ForgotPassword`, body
    );
  }

  resetPassword(body: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(
      `${this.apiUrl}ResetPassword`, body
    );
  }
  

}