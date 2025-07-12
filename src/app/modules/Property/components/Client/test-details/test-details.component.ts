  import { Component, Input, OnInit } from '@angular/core';

  export interface PropertyImage {
    id: number;
    imageUrl: string;
    propertyId: number;
  }

  export interface PropertyOwner {
    userId: string;
    name?: string;
    email: string;
    phoneNumber: string;
  }

  export enum VerificationStatus {
    Pending = 0,
    Verified = 1,
    Rejected = 2
  }

  export interface Property {
    id: number;
    description: string;
    amenities: string;
    numberOfRooms: number;
    pricePerNight: number;
    buildingNo: number;
    floorNo: number;
    address: string;
    city: string;
    region: string;
    street: string;
    latitude: number;
    longitude: number;
    phoneNumber: string;
    cancelationOptions: boolean;
    isForRent: boolean;
    verificationStatus: VerificationStatus;
    cancelationCharges: number;
    modificationDate: Date;
    ownerId: string;
    isDeleted: boolean;
    propertyOwner?: PropertyOwner;
    propertyImages?: PropertyImage[];
  }

  @Component({
    selector: 'app-test-details',
    templateUrl: './test-details.component.html',
    styleUrls: ['./test-details.component.css'],
    standalone: false, 
  })
  export class TestDetailsComponent implements OnInit {
    @Input() property!: Property;
    
    currentImageIndex = 0;
    showContactInfo = false;
    isBookingModalOpen = false;
    
    // Sample data for demonstration
    sampleProperty: Property = {
      id: 1,
      description: "Beautiful 2-bedroom apartment with stunning city views. Modern amenities, fully furnished, perfect for business travelers or vacation stays. Located in the heart of downtown with easy access to restaurants, shopping, and public transportation.",
      amenities: "WiFi, Air Conditioning, Kitchen, Washing Machine, TV, Parking, Gym Access, Pool",
      numberOfRooms: 2,
      pricePerNight: 120.50,
      buildingNo: 15,
      floorNo: 8,
      address: "123 Downtown Avenue",
      city: "New York",
      region: "Manhattan",
      street: "Broadway Street",
      latitude: 40.7128,
      longitude: -74.0060,
      phoneNumber: "+1-555-0123",
      cancelationOptions: true,
      isForRent: true,
      verificationStatus: VerificationStatus.Verified,
      cancelationCharges: 25.00,
      modificationDate: new Date('2024-01-15'),
      ownerId: "owner123",
      isDeleted: false,
      propertyOwner: {
        userId: "owner123",
        name: "John Smith",
        email: "john.smith@email.com",
        phoneNumber: "+1-555-0123"
      },
      propertyImages: [
        { id: 1, imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800", propertyId: 1 },
        { id: 2, imageUrl: "https://images.unsplash.com/photo-1571508601793-a3ede3ec4e9b?w=800", propertyId: 1 },
        { id: 3, imageUrl: "https://images.unsplash.com/photo-1560448075-cbc16bb4af8e?w=800", propertyId: 1 }
      ]
    };

    ngOnInit(): void {
      // Use sample data if no property is provided
      if (!this.property) {
        this.property = this.sampleProperty;
      }
    }

    get amenitiesList(): string[] {
      return this.property?.amenities?.split(',').map(a => a.trim()) || [];
    }

    get verificationStatusText(): string {
      switch (this.property?.verificationStatus) {
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
      switch (this.property?.verificationStatus) {
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
      if (this.property?.propertyImages && this.property.propertyImages.length > 0) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.property.propertyImages.length;
      }
    }

    prevImage(): void {
      if (this.property?.propertyImages && this.property.propertyImages.length > 0) {
        this.currentImageIndex = this.currentImageIndex === 0 
          ? this.property.propertyImages.length - 1 
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

    onBookProperty(): void {
      // Implement booking logic here
      console.log('Booking property:', this.property?.id);
      alert('Booking functionality would be implemented here!');
      this.closeBookingModal();
    }

    openMap(): void {
      if (this.property?.latitude && this.property?.longitude) {
        const url = `https://www.google.com/maps?q=${this.property.latitude},${this.property.longitude}`;
        window.open(url, '_blank');
      }
    }
  }