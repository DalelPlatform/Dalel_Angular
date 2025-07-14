import {Component, OnInit} from '@angular/core';
import {IPropertyReview} from '../../../../Models/iproperty-review';
import {PropertyOwnerService} from '../../../../../../Services/Property/property-owner.service';

@Component({
  selector: 'app-review',
  standalone: false,
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit{

  reviews: IPropertyReview[] = [];
  isLoading = true;
  hasError = false;
  errorMessage = '';

  constructor(private service: PropertyOwnerService) { }

  ngOnInit() {
    this.getReviews();
  }

  getReviews() {
    this.isLoading = true;
    this.hasError = false;
    
          this.service.getAllReviews().subscribe({
        next: (res) => {
          console.log(res);
          if (res.Success) {
            this.reviews = res.Data || [];
            console.log('Reviews loaded:', this.reviews);
          } else if (res === "No Reviews Found") {
            this.reviews = [];
            console.log('No reviews found');
          } else {
            this.hasError = true;
            this.errorMessage = res.Message || 'Failed to load reviews';
          }
          this.isLoading = false;
        },
      error: (err) => {
        console.error('Error loading reviews:', err);
        this.hasError = true;
        this.errorMessage = 'Failed to load reviews. Please try again.';
        this.isLoading = false;
      }
    });
  }

  getRatingStars(rating: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i < rating ? 1 : 0);
  }

  getRatingClass(rating: number): string {
    if (rating >= 4) return 'rating-excellent';
    if (rating >= 3) return 'rating-good';
    if (rating >= 2) return 'rating-average';
    return 'rating-poor';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  getAverageRating(): number {
    if (this.reviews.length === 0) return 0;
    const totalRating = this.reviews.reduce((sum, review) => sum + review.Rating, 0);
    return totalRating / this.reviews.length;
  }

  trackByReviewId(index: number, review: IPropertyReview): number {
    return review.Id;
  }
}
