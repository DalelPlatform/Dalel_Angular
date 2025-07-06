import { Component, OnInit } from '@angular/core';
import { ServiceRequestDetails } from '../Models/service-request.model';
import { RequestService } from '../Services/request.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-service-provider-all-requests',
  standalone: false,
  templateUrl: './service-provider-all-requests.component.html',
  styleUrl: './service-provider-all-requests.component.css'
})
export class ServiceProviderAllRequestsComponent implements OnInit {
  searchForm!: FormGroup;
  requests: ServiceRequestDetails[] = [];
  isLoading = true;
  pageSize = 5;
  currentPage = 1;
  totalCount = 0;
  totalPages = 0;
  pages: number[] = [];
  categories: any[] = [];
  usersDetails: { [key: string]: any } = {};



  constructor(private requestService: RequestService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadRequests();
    this.loadCategories();
    this.searchForm = this.fb.group({
      title: [''],
      description: [''],
      address: [''],
      categories: [],
      categoryId: ['']
    });
  }

  loadCategories(): void {
    this.requestService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.Data;
        console.log('Categories loaded:', response.Data);
      },
      error: (err) => {
        alert('Failed to load categories');
      }
    });
  }
  sortRequestsByDate(): void {
    this.requests.sort((a, b) => {
      return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    });
  }


  loadRequests(): void {
    this.isLoading = true;

    this.requestService.getAcceptedRequests(this.pageSize, this.currentPage).subscribe({
      next: (response) => {
        this.requests = response.Data.Data;
        this.sortRequestsByDate();
         this.requests.forEach((request) => {
        const clientId = request.ClientId;
        if (clientId) {
          this.getUserDetails(clientId); 
        }
      });

        this.totalCount = response.Data.TotalCount;
        this.totalPages = Math.ceil(this.totalCount / this.pageSize);
        this.generatePageNumbers();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading requests:', err);
        this.isLoading = false;
      }
    });
  }

  onSearch() {
    const title = this.searchForm.value.title?.trim() || '';
    const description = this.searchForm.value.description?.trim() || '';
    const address = this.searchForm.value.address?.trim() || '';
    const categoryId = this.searchForm.value.categoryId || '';

    const isAllEmpty = !title && !description && !address && !categoryId;

    if (!isAllEmpty) {
      this.requestService
        .getRequests(title, description, address, categoryId)
        .subscribe({
          next: (response) => {
            this.requests = response.Data.Data;
            this.totalCount = response.Data.TotalCount;
            this.totalPages = Math.ceil(this.totalCount / this.pageSize);
            this.generatePageNumbers();
          },
          error: (err) => {
            console.error('Error searching requests:', err);
          }
        });
    } else {
      this.loadRequests();
    }
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


  viewRequestDetails(requestId: number): void {
    window.location.href = `/request/${requestId}`;
  }
  getTimeSince(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} Seconds`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} Minutes`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours`;
    return `${Math.floor(diffInSeconds / 86400)} days`;
  }
  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.Id === categoryId);
    return category ? category.Name : 'Unknown Category';
  }
  getUserDetails(userId: string): void {
  if (!this.usersDetails[userId]) {
    this.requestService.getClient(userId).subscribe({
      next: (res) => {
        console.log(`Loaded user ${userId}:`, res.Data);
        this.usersDetails[userId] = res.Data.userName || res.Data.UserName || 'No Name';
      },
      error: (err) => {
        console.error(`Error fetching user ${userId}:`, err);
        this.usersDetails[userId] = 'Unknown';
      }
    });
  }
}


}