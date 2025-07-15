import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { RatingService, ReviewsResponse } from '../Services/rating.service';
import { Review } from '../Models/review.model';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-reviews-list',
  standalone: false,
  templateUrl: './reviews-list.component.html',
  styleUrls: ['./reviews-list.component.css']
})
export class ReviewsListComponent implements OnInit, OnDestroy, OnChanges {
  providerId: string = '';

  reviews: Review[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalCount: number = 0;
  totalPages: number = 0;
  loading: boolean = false;
  error: string = '';

  // Page size options
  pageSizeOptions: number[] = [5, 10, 15, 20];

  // Average rating info
  averageRating: number = 0;

  private destroy$ = new Subject<void>();
  private loadReviewsSubject = new Subject<void>();

  constructor(private reviewsService: RatingService, private route: ActivatedRoute, private router: Router) {
    // Debounce the loadReviews calls to prevent excessive API calls
    this.loadReviewsSubject
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.performLoadReviews();
      });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.providerId = params.get('providerId') || '';
    });

  this.performLoadReviews()
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['providerId'] && changes['providerId'].currentValue) {
      this.resetPagination();
      this.loadReviews();
      // this.loadAverageRating();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadReviews(): void {
    this.loadReviewsSubject.next();
  }

  private performLoadReviews(): void {
    if (!this.providerId) {
      return;
    }

    this.loading = true;
    this.error = '';

    this.reviewsService.getReviewsByProvider(this.providerId, this.pageSize, this.currentPage)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: ReviewsResponse) => {
          this.loading = false;

          if (response.Success && response.Data) {
            this.reviews = response.Data.Data;
            console.log(this.reviews);

            this.totalCount = response.Data.TotalCount;
            this.pageSize = response.Data.PageSize;
            this.currentPage = response.Data.PageNumber;
            this.totalPages = Math.ceil(this.totalCount / this.pageSize);
          } else {

            this.error = response.Message || 'Failed to load reviews';
            console.log(this.error);
            this.reviews = [];
            this.totalCount = 0;
          }
        },
        error: (err) => {
          this.loading = false;
          this.error = 'An error occurred while loading reviews';
          this.reviews = [];
          this.totalCount = 0;
          console.error('Error loading reviews:', err);
        }
      });

  }
  Back() {
    this.router.navigate(["/ServiceProviderlayout/ServiceProvider"])
  }

  onPageChange(page: number): void {
    if (page !== this.currentPage && page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadReviews();
      this.scrollToTop();
    }
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = parseInt(target.value, 10);

    if (newSize !== this.pageSize) {
      this.pageSize = newSize;
      this.currentPage = 1; // Reset to first page when page size changes
      this.loadReviews();
      this.scrollToTop();
    }
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
  }

  getStarClass(index: number, rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    if (index < fullStars) {
      return 'star filled';
    } else if (index === fullStars && hasHalfStar) {
      return 'star half-filled';
    } else {
      return 'star';
    }
  }

  formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  getTimeAgo(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInMs = now.getTime() - dateObj.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffInDays / 365);
      return `${years} year${years > 1 ? 's' : ''} ago`;
    }
  }

  refresh(): void {
    this.resetPagination();
    this.loadReviews();
    // this.loadAverageRating();
  }

  trackByReviewId(index: number, review: Review): number {
    return review.Id;
  }

  private resetPagination(): void {
    this.currentPage = 1;
    this.totalCount = 0;
    this.totalPages = 0;
  }

  private scrollToTop(): void {
    const element = document.querySelector('.reviews-container');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Helper methods for pagination display
  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalCount);
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  // Rating statistics
  getRatingDistribution(): { [key: number]: number } {
    const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    this.reviews.forEach(review => {
      const rating = Math.floor(review.Rating);
      if (rating >= 1 && rating <= 5) {
        distribution[rating]++;
      }
    });

    return distribution;
  }

  getRatingPercentage(rating: number): number {
    if (this.reviews.length === 0) return 0;
    const distribution = this.getRatingDistribution();
    return (distribution[rating] / this.reviews.length) * 100;
  }
}