import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../Services/request.service';
import { ServiceRequestDetails } from '../../Models/service-request.model';
import { Observable } from 'rxjs';
import { AccountService } from '../../../user/services/user.service';
import { CookieOptions, CookieService } from 'ngx-cookie-service';
// import { FilterPipe } from '../filter.pipe';
export interface ClientRequest {
  Id: string;
  ClientId: string;
  Title: string;
  CategoryServicesId: number;
  Description: string;
  Address: string;
  Date: Date;
  DueDate: Date;
  StartPrice: number;
  Imagepath?: string;
  Status: 'Pending' | 'Accepted' | 'InProgress' | 'Completed' | 'Cancelled';
  ClientName?: string;
  CategoryName?: string;
}

export interface ClientRequestsResponse {
  Data: any;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
@Component({
  selector: 'app-all-requests',
  standalone: false,
  templateUrl: './all-requests.component.html',
  styleUrl: './all-requests.component.css'
})
export class AllRequestsComponent implements OnInit {
  clientRequests: ClientRequest[] = [];
  currentPage = 1;
  pageSize = 6;
  totalCount = 0;
  totalPages = 0;
  isLoading = false;
  error: string | null = null;
    userProfile: any = null;
  
  // Status counts
  acceptedCount = 0;
  pendingCount = 0;
  inProgressCount = 0;

  constructor(private clientService: RequestService, private accountSerivce: AccountService, private cookieService: CookieService) {} 

  ngOnInit() {
    this.loadClientRequests();
  }

  loadClientRequests() {
    this.isLoading = true;
    this.error = null;

    this.clientService.getClientRequests(this.pageSize, this.currentPage)
      .subscribe({
        next: (response: ClientRequestsResponse) => {
          this.clientRequests = response.Data.Data || [];
          this.totalCount = response.totalCount || 0;
          this.totalPages = response.totalPages || 0;
          this.calculateStatusCounts();
          this.loadUserProfile();
          console.log(this.clientRequests);
          
        
          this.isLoading = false;
        },
        error: (error: any) => {
          this.error = 'Failed to load client requests. Please try again.';
          this.isLoading = false;
          console.error('Error loading client requests:', error);
        }
      });
  }

   loadUserProfile() {
    const token = this.cookieService.get('Token'); // أو localStorage.getItem('Token')
    if (!token) {
      this.error = 'User not authenticated.';
      return;
    }

    this.accountSerivce.getProfile(token).subscribe({
      next: (response) => {
        this.userProfile = response.Data || response; // حسب شكل الـ API
        console.log('User profile:', this.userProfile);
      },
      error: (err) => {
        this.error = 'Failed to load profile.';
        console.error(err);
      }
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.loadClientRequests();
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'Pending': return 'badge-warning';
      case 'Accepted': return 'badge-success';
      case 'InProgress': return 'badge-info';
      case 'Completed': return 'badge-primary';
      case 'Cancelled': return 'badge-danger';
      default: return 'badge-secondary';
    }
  }


  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
  
  refreshData() {
    this.currentPage = 1;
    this.loadClientRequests();
  }

  viewDetails(request: ClientRequest) {
    // Implement view details logic
    console.log('View details for:', request);
  }

  editRequest(request: ClientRequest) {
    // Implement edit logic
    console.log('Edit request:', request);
  }

  deleteRequest(request: ClientRequest) {
    // Implement delete logic
    if (confirm('Are you sure you want to delete this request?')) {
      console.log('Delete request:', request);
    }
  }

  private calculateStatusCounts() {
    this.acceptedCount = this.clientRequests.filter(r => r.Status === 'Accepted').length;
    this.pendingCount = this.clientRequests.filter(r => r.Status === 'Pending').length;
    this.inProgressCount = this.clientRequests.filter(r => r.Status === 'InProgress').length;
  }


}
