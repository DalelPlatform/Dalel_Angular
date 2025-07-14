import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
   private apiUrl = `${environment.baseApi}`
  constructor(private http: HttpClient) {}

  registerAgency(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}TravelAgencies`, data, { headers });
  }
  getMyAgencies(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}TravelAgencies`,  { headers });
  }
  getOwnerEarnings(token: string): Observable<any> {
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
     return this.http.get(`${this.apiUrl}TravelAgencies/Owner/Earnings`,  { headers });
  }
getOwnerTotalReviews(token: string): Observable<any> {
  const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  return this.http.get(`${this.apiUrl}TravelAgencies/GetOwnerTotalReviews`,  { headers });
}

  getAgencyById(token: string,id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}TravelAgencies/${id}`,  { headers });
  }
  updatetravelAgency(id:number,data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`${this.apiUrl}TravelAgencies/${id}`, data, { headers });
  }
  deleteAgency(token: string,id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}TravelAgencies/${id}`,  { headers });
  }
  deletePackage(token: string,id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}AgencyPackage/${id}`,  { headers });
  }
  getMyPackages(agencyId: number): Observable<any> {
  
    return this.http.get(`${this.apiUrl}AgencyPackage?id=${agencyId}`);
  }

  addPackage(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}AgencyPackage`, data, { headers });
  }
  searchPackages(filters: {
    searchText?: string;
    Name?: string;
    Price?: string;
    pageSize?: number;
    pageIndex?: number;
    OrderBy?: string;
    IsAscending?: boolean;
  }) {
    let params = new HttpParams();

    Object.keys(filters).forEach(key => {
      const value = (filters as any)[key];
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, value);
      }
    });

    return this.http.get(`${this.apiUrl}AgencyPackage/search`, { params });
  }
  getpackageById(id:number): Observable<any> {
 
    return this.http.get(`${this.apiUrl}AgencyPackage/${id}`);
  }

  bookPackage(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}Packagebooking/Booking`, data, { headers });
  }
  CancelPackage(id:number,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(`${this.apiUrl}Packagebooking/${id}`, { headers });
  }

    packagePaymentconfurm(data: any,token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}AgencyPayment/Payment`,data, { headers });
  }


  PackageSchaduleById(token: string,id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}PackageSchadule/getBookingBySchadule/${id}`,  { headers });
  }
  PackageSchaduleByPackageId(token: string,id:number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}PackageSchadule/getSchadulesByPackageId/${id}`,  { headers });
  }

addreviewPackage(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`${this.apiUrl}packageReview`, data, { headers });
  
}
  getPackageReveiw(packageId:number):Observable<any>{
 return this.http.get(`${this.apiUrl}packageReview/GetPackageReviews/${packageId}`);
  }
  // landng
  getTopPackages() :Observable<any>{

 return this.http.get(`${this.apiUrl}AgencyPackage/TopPackages`);
  }
}


