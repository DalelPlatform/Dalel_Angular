import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../Services/request.service';
import { ServiceRequestDetails } from '../../Models/service-request.model';
import { StatusTextPipe } from '../../Pipes/request-status.pipe';
@Component({
  selector: 'app-all-requests',
  standalone: false,
  templateUrl: './all-requests.component.html',
  styleUrl: './all-requests.component.css'
})
export class AllRequestsComponent implements OnInit {

  requests: ServiceRequestDetails[] = [];
  isLoading = true;
  pageSize = 5;
  currentPage = 1;
  totalCount = 0;
  totalPages = 0;
  pages: number[] = [];

  constructor(private requestService: RequestService) { }

  ngOnInit(): void {
    this.loadRequests();
  }
  sortRequestsByDate(): void {
  this.requests.sort((a, b) => {
    return new Date(b.Date).getTime() - new Date(a.Date).getTime();
  });
}
  loadRequests(): void {
    this.isLoading = true;
    this.requestService.getAcceptedRequests(this.pageSize, this.currentPage)
      .subscribe({
        next: (response) => {
          this.requests = response.Data.Data;
                    this.sortRequestsByDate();

          this.totalCount = response.Data.TotalCount;
          this.totalPages = Math.ceil(this.totalCount / this.pageSize);
          this.generatePageNumbers();
          this.isLoading = false;
        }
        ,
        error: (err) => {
          console.error('Error loading requests:', err);
          this.isLoading = false;
        }
      });

  }

  generatePageNumbers(): void {
    this.pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      this.pages.push(i);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadRequests();
    }
  }

  getStatusText(status: number): string {
    switch(status) {
      case 2: return 'Accepted';
      case 1: return 'Pending';
      case 0: return 'Rejected';
      default: return 'Unknown';
    }
  }

  getStatusClass(status: number): string {
    switch(status) {
      case 2: return 'bg-success';
      case 1: return 'bg-warning text-dark';
      case 0: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
  viewRequestDetails(requestId: number): void {
    window.location.href = `/request/${requestId}`;
}
  getTimeSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} ثانية`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} دقيقة`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ساعة`;
    return `${Math.floor(diffInSeconds / 86400)} يوم`;
  }
}