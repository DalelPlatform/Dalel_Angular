import { Component, Input, OnInit } from '@angular/core';
import { IProperty, VerificationStatus } from '../../../Models/IProperty';
import { ActivatedRoute } from '@angular/router';
import { PropertyOwnerService } from '../../../../../Services/Property/property-owner.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
  standalone: false,
})
export class PropertyDetailsComponent implements OnInit {
  @Input() property: IProperty | null = null;

  currentImageIndex = 0;
  showContactInfo = false;
  isBookingModalOpen = false;
  bookingData = {
    checkIn: '',
    checkOut: '',
    guests: 1
  };
  // Sample data for demonstration
  sampleProperty: IProperty = {
    Id: 1,
    Description: "Beautiful 2-bedroom apartment with stunning city views. Modern amenities, fully furnished, perfect for business travelers or vacation stays. Located in the heart of downtown with easy access to restaurants, shopping, and public transportation.",
    Amenities: "WiFi, Air Conditioning, Kitchen, Washing Machine, TV, Parking, Gym Access, Pool",
    NumberOfRooms: 2,
    PricePerNight: 120.50,
    BuildingNo: 15,
    FloorNo: 8,
    Address: "123 Downtown Avenue",
    City: "New York",
    Region: "Manhattan",
    Street: "Broadway Street",
    Latitude: 40.7128,
    Longitude: -74.0060,
    PhoneNumber: "+1-555-0123",
    CancelationOptions: true,
    IsForRent: true,
    VerificationStatus: VerificationStatus.Verified,
    Rating: 4.5,
    CancelationCharges: 25.00,
    // propertyOwner: {
    //   userId: "owner123",
    //   name: "John Smith",
    //   email: "john.smith@email.com",
    //   phoneNumber: "+1-555-0123"
    // },
    PropertyOwner : "John Smith",
    Images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800",
      "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800"
    ]
  };

  processPayment(bookingId: number, amount: number, token: string): void {
    // Here you can integrate PayPal/Stripe payment
    // For now, simulate success then call API

    // 💳 Example: Simulate successful payment
    const paymentPayload = {
      amount: amount,
      paymentMethod: 0, // PaymentMethod.Paypal or Stripe
      paymentStatus: 1, // PaymentStatus.Paid
      transactionDateTime: new Date(),
      amountPaid: amount,
      commissionDeducted: 0,
      codeApplied: null,
      bookingPropertyId: bookingId
    };

    this.service.addPayment(paymentPayload, token).subscribe({
      next: (res) => {
        console.log("Payment success", res);
        alert("Booking and payment successful!");
      },
      error: (err) => {
        console.error(err);
        alert("Payment failed.");
      }
    });
  }
  constructor( private service: PropertyOwnerService ,private route: ActivatedRoute, private cookieService: CookieService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.service.getProperty(id).subscribe({
      next: (res) => {
        this.property = res.Data;
        console.log(res.Data);
      },
      error: (err) => {
        console.log(err);
      }
    });
    // Use sample data if no property is provided
    if (!this.property) {
      this.property = this.sampleProperty;
    }
  }

  get amenitiesList(): string[] {
    return this.property?.Amenities?.split(',').map(a => a.trim()) || [];
  }

  get verificationStatusText(): string {
    switch (this.property?.VerificationStatus) {
      case VerificationStatus.Verified:
        return 'Verified';
      case VerificationStatus.Pending:
        return 'Pending';
      case VerificationStatus.Rejected:
        return 'Rejected';
      default:
        return 'Unknown';
    }
  }

  get verificationStatusClass(): string {
    switch (this.property?.VerificationStatus) {
      case VerificationStatus.Verified:
        return 'status-verified';
      case VerificationStatus.Pending:
        return 'status-pending';
      case VerificationStatus.Rejected:
        return 'status-rejected';
      default:
        return 'status-unknown';
    }
  }

  nextImage(): void {
    if (this.property?.Images && this.property.Images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.property.Images.length;
    }
  }

  prevImage(): void {
    if (this.property?.Images && this.property.Images.length > 0) {
      this.currentImageIndex = this.currentImageIndex === 0
        ? this.property.Images.length - 1
        : this.currentImageIndex - 1;
    }
  }

  selectImage(index: number): void {
    this.currentImageIndex = index;
  }

  toggleContactInfo(): void {
    this.showContactInfo = !this.showContactInfo;
  }

  openBookingModal(): void {
    this.isBookingModalOpen = true;
  }

  closeBookingModal(): void {
    this.isBookingModalOpen = false;
  }

  // onBookProperty(): void {
  //   // Implement booking logic here
  //   console.log('Booking property:', this.property?.Id);
  //   alert('Booking functionality would be implemented here!');
  //   this.closeBookingModal();
  // }

  onBookProperty(): void {
    const token = this.cookieService.get('Token'); // or AuthService
    const payload = {
      CheckIn: new Date(this.bookingData.checkIn).toISOString(),
      CheckOut: new Date(this.bookingData.checkOut).toISOString(),
      Price: 20,
      Status: 0, // BookingStatus.Panding
      PropertyId: this.property?.Id,

    };

    if (!token) return alert("Login required!");

    this.service.bookProperty(payload, token).subscribe({
      next: (res) => {
        console.log("Booking result:", res);
        alert(res.Message);

        // const bookingId = res.data?.id || res.Data?.id || 0;
        // if (bookingId) {
        //   this.processPayment(bookingId, payload.Price, token);
        // } else {
        //   alert("Booking failed!");
        // }


      },
      error: (err) => {
        console.error("Booking failed:", err);
        if (err.error && err.error.errors) {
          const messages = Object.values(err.error.errors).flat().join('\n');
          alert("Booking failed:\n" + messages);
        } else {
          alert("Booking failed.");
        }
      }
    });

    this.closeBookingModal();
  }
  openMap(): void {
    if (this.property?.Latitude && this.property?.Longitude) {
      const url = `https://www.google.com/maps?q=${this.property.Latitude},${this.property.Longitude}`;
      window.open(url, '_blank');
    }
  }
}
