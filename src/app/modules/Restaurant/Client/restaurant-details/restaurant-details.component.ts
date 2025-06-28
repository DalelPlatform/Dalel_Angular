import { Component, OnInit, OnDestroy, inject, input, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IRestaurant } from '../../interfaces/irestaurant';
import { RestaurantService } from '../../../../Services/Restaurant/restaurant.service';

// Mock enums and interfaces (move to a shared model file if needed)
enum VerificationStatus {
  Verified = 'Verified',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

// interface Restaurant {
//   id: string;
//   name: string;
//   description: string;
//   numberOfRooms: number;
//   buildingNo: number;
//   address: string;
//   city: string;
//   region: string;
//   street: string;
//   latitude: number;
//   longitude: number;
//   phoneNumber: string;
//   verificationStatus: VerificationStatus;
//   images: string[];
// }

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.css'],
  standalone: false
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);
  private service = inject(RestaurantService);



  private activateRoute = inject(ActivatedRoute);
  restaurantId!: number;
  // private restaurantService = inject(RestaurantService); // Uncomment when using real API

  restaurant: IRestaurant | null = null;
  isLoading = true;
  hasError = false;
  errorMessage = '';

  private destroy$ = new Subject<void>();

  ngOnInit(): void {

    this.loadRestaurantDetails();
    this.restaurantId = Number(this.route.snapshot.paramMap.get('id'));
    this.getMenuItemss();
  }

  getMenuItemss(){
    this.service.getMenuItems(this.restaurantId).subscribe({
      next: (res) => {
        console.log("there is getMenuItems")
        console.log(res.Data);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadRestaurantDetails(): void {
    const restaurantId = Number(this.route.snapshot.paramMap.get('id'));

    if (!restaurantId) {
      this.handleError('Restaurant ID not found');
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    // Mock data - replace with actual service call
    this.loadMockData(restaurantId);

    /*
    // Actual service call
    this.restaurantService.getRestaurantById(restaurantId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (restaurant) => {
          this.restaurant = restaurant;
          this.isLoading = false;
        },
        error: (error) => {
          this.handleError('Failed to load restaurant details');
        }
      });
    */
  }

  private loadMockData(id: number): void {
    setTimeout(() => {
      this.service.getRestaurantDetails(id).subscribe({
        next: (res) => {

         this.restaurant = res.Data;
          console.log(this.restaurant);
          // console.log(res.Data.Data[0].Description);
        },
        error: (err) => {
          console.log(err);
        }
      })
  ;
      this.isLoading = false;
    }, 1000);
  }

  private handleError(message: string): void {
    this.isLoading = false;
    this.hasError = true;
    this.errorMessage = message;
  }

  getVerificationClass(): string {
    if (!this.restaurant) return '';
    switch (this.restaurant.VerificationStatus) {
      case VerificationStatus.Verified:
        return 'verified';
      case VerificationStatus.Pending:
        return 'pending';
      case VerificationStatus.Rejected:
        return 'rejected';
      default:
        return 'pending';
    }
  }

  getVerificationIcon(): string {
    if (!this.restaurant) return 'fas fa-question-circle';
    switch (this.restaurant.VerificationStatus) {
      case VerificationStatus.Verified:
        return 'fas fa-check-circle';
      case VerificationStatus.Pending:
        return 'fas fa-clock';
      case VerificationStatus.Rejected:
        return 'fas fa-times-circle';
      default:
        return 'fas fa-question-circle';
    }
  }

  getVerificationText(): string {
    if (!this.restaurant) return 'Unknown Status';
    switch (this.restaurant.VerificationStatus) {
      case VerificationStatus.Verified:
        return 'Verified Restaurant';
      case VerificationStatus.Pending:
        return 'Verification Pending';
      case VerificationStatus.Rejected:
        return 'Verification Failed';
      default:
        return 'Unknown Status';
    }
  }

  getMapUrl(): SafeResourceUrl {
    if (!this.restaurant) return '';
    const { Latitude, Longitude } = this.restaurant;
    const offset = 0.01;
    const url = `https://www.openstreetmap.org/export/embed.html?bbox=${Longitude - offset},${Latitude - offset},${Longitude + offset},${Latitude + offset}&marker=${Latitude},${Longitude}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  goBack(): void {
    this.router.navigate(['/restaurants']);
  }

  callRestaurant(): void {
    if (this.restaurant?.PhoneNumber) {
      window.location.href = `tel:${this.restaurant.PhoneNumber}`;
    }
  }

  makeReservation(): void {
    console.log('Making reservation for:', this.restaurant?.Name);
    // Implement modal or routing here
  }

  getDirections(): void {
    if (this.restaurant) {
      const { Latitude, Longitude } = this.restaurant;
      const url = `https://www.google.com/maps/dir/?api=1&destination=${Latitude},${Longitude}`;
      window.open(url, '_blank');
    }
  }

  shareRestaurant(): void {
    if (this.restaurant && navigator.share) {
      navigator.share({
        title: this.restaurant.Name,
        text: this.restaurant.Description,
        url: window.location.href
      }).catch(err => console.log('Error sharing:', err));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Restaurant link copied to clipboard!'))
        .catch(err => console.log('Error copying to clipboard:', err));
    }
  }

  retryLoad(): void {
    this.loadRestaurantDetails();
  }
}
