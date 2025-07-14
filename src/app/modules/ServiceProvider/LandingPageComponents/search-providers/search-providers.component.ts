import { Component, OnInit } from '@angular/core';
import { ServiceProvider } from '../../Models/serviceprovider.model';
import { Review } from '../../Models/review.model';
import { Proposal } from '../../Models/proposal.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CategoryServices } from '../../Models/category.model';
import { RequestService } from '../../Services/request.service';
import { ServiceProviderService } from '../../Services/provider.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';

export interface SearchResult {
  items: ServiceProvider[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  totalPages: number;
}

@Component({
  selector: 'app-search-providers',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule], templateUrl: './search-providers.component.html',
  styleUrl: './search-providers.component.css'
})
export class SearchProvidersComponent implements OnInit {
  serviceProviders: ServiceProvider[] = [];
  loading = false;
  isSearching = false;
  searchText = '';
  categoryId = 3; // Default category ID
  address = '';
  sortBy = 'Name';
  categories: CategoryServices[] = [];
  Proposals: ServiceProvider[] = [];
  searchForm!: FormGroup;
  pageSize = 6;
  pageIndex = 1;
  currentPage = 1;
  totalPages = 0;
  pages: number[] = [];
  totalCount = 0;

  // Search debounce
  private searchSubject = new Subject<string>();

  // Hero slider images
  heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Find Professional Service Providers',
      description: 'Connect with skilled professionals in your area'
    },
    {
      url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Quality Services at Your Fingertips',
      description: 'Browse through verified and trusted service providers'
    },
    {
      url: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      title: 'Book Services with Confidence',
      description: 'Read reviews and compare prices before booking'
    }
  ];

  constructor(
    private requestService: RequestService,
    private providerService: ServiceProviderService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadProvidersByCategory();
    this.setupSearchDebounce();
  }

  initForm(): void {
    this.searchForm = this.fb.group({
      name: [''],
      address: [''],
      categoryId: [this.categoryId] // Set default category
    });
  }

  setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.onSearch();
    });
  }

  loadCategories(): void {
    this.loading = true;
    this.requestService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.Data || [];
        console.log('Categories loaded:', response.Data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this.loading = false;
        // Handle error gracefully - you might want to show a toast notification
      }
    });
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.Id === categoryId);
    return category ? category.Name : 'Unknown Category';
  }

  loadProvidersByCategory(): void {
    this.isSearching = false;
    this.loading = true;

    this.providerService.getByCategory(this.categoryId, this.pageSize, this.pageIndex)
      .subscribe({
        next: (response) => {
          this.serviceProviders = response.Data?.Data || response.Data || [];
          this.totalCount = response.Data?.TotalCount || 0;
          this.totalPages = Math.ceil(this.totalCount / this.pageSize);
          this.generatePageNumbers();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading providers by category:', err);
          this.loading = false;
          this.serviceProviders = [];
        }
      });
  }

  onSearch(): void {
    const name = this.searchForm.value.name?.trim() || '';
    const address = this.searchForm.value.address?.trim() || '';
    const categoryId = this.searchForm.value.categoryId || null;

    const isAllEmpty = !name && !address && !categoryId;

    if (!isAllEmpty) {
      this.isSearching = true;
      this.loading = true;
      this.pageIndex = 1; // Reset to first page on new search
      this.currentPage = 1;

      const params = {
        searchText: name || undefined,
        address: address || undefined,
        categoryId: categoryId || undefined,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      };

      this.providerService.searchProviders(params).subscribe({
        next: (response) => {
          this.serviceProviders = response.Data?.Data || response.Data || [];
          this.totalCount = response.Data?.TotalCount || 0;
          this.totalPages = Math.ceil(this.totalCount / this.pageSize);
          this.generatePageNumbers();
          this.loading = false;
        },
        error: (err) => {
          console.error('Error searching providers:', err);
          this.loading = false;
          this.serviceProviders = [];
        }
      });
    } else {
      this.loadProvidersByCategory();
    }
  }

  onSearchInputChange(): void {
    this.searchSubject.next(this.searchForm.value.name || '');
  }

  onCategoryChange(): void {
    this.categoryId = this.searchForm.value.categoryId || this.categoryId;
    this.pageIndex = 1;
    this.currentPage = 1;
    this.onSearch();
  }

  clearSearch(): void {
    this.searchForm.reset({
      name: '',
      address: '',
      categoryId: this.categoryId
    });
    this.pageIndex = 1;
    this.currentPage = 1;
    this.loadProvidersByCategory();
  }

  generatePageNumbers(): void {
    this.pages = [];
    const maxVisiblePages = 5;

    if (this.totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to max visible, show all
      for (let i = 1; i <= this.totalPages; i++) {
        this.pages.push(i);
      }
    } else {
      // Complex pagination logic
      let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        this.pages.push(i);
      }
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.pageIndex = page;

      if (this.isSearching) {
        this.onSearch();
      } else {
        this.loadProvidersByCategory();
      }
    }
  }

  goToFirstPage(): void {
    this.goToPage(1);
  }

  goToLastPage(): void {
    this.goToPage(this.totalPages);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  getProviderImage(provider: ServiceProvider): string {
    // Assuming ServiceProvider has an image property
    return (provider as any).Image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
  }

  getProviderPrice(provider: ServiceProvider): string {
    // Assuming ServiceProvider has price and priceUnit properties
    const price = (provider as any).Price || 0;
    const unit = (provider as any).PriceUnit || 'hour';
    return `$${price}/${unit}`;
  }
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // في SearchProvidersComponent
// (provider: ServiceProvider): void {
//   this.router.navigateByUrl('/ProviderProfile', {
//     state: { provider } 
//   });
// }
viewProviderDetails(provider: ServiceProvider): void {
    this.router.navigate(['/ProviderProfile'], { queryParams: { userId: provider.UserId } });
  }




  contactProvider(provider: ServiceProvider): void {
    // Open contact modal or navigate to contact page
    console.log('Contact provider:', provider);
    // You can implement contact logic here
  }

  bookService(provider: ServiceProvider): void {
    // Navigate to booking page
    console.log('Book service with provider:', provider);
    // You can implement booking logic here
  }
}