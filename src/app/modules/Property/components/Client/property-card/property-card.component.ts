import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProperty } from '../../../Models/IProperty';

@Component({
  selector: 'app-property-card',
  standalone: false,
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property!: IProperty;
  @Output() ProductDetails = new EventEmitter<number>();

  constructor() {
    console.log(this.property);
   }

  ngOnInit() {
  }

  goToDetails(id : number) {
    this.ProductDetails.emit(this.property.Id);
  }

}

/*
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProperty } from '../../../../../core/models/Property/IProperty';

@Component({
  selector: 'app-property-card',
  standalone: false,
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent implements OnInit {

  @Input() property!: IProperty;
  @Output() PropertyDetails = new EventEmitter<number>(); // Renamed from ProductDetails to PropertyDetails
  @Output() PropertyFavorite = new EventEmitter<number>(); // Optional: for favorite functionality
  @Output() PropertyContact = new EventEmitter<number>(); // Optional: for quick contact

  constructor() {
    // Note: property will be undefined here since @Input hasn't been set yet
    // Move console.log to ngOnInit or ngAfterViewInit
  }

  ngOnInit() {
    // Property is available here after Angular sets the @Input
    console.log('Property loaded:', this.property);
  }

  // Navigate to property details
  goToDetails(id: number = this.property.id) {
    this.PropertyDetails.emit(id);
  }

  // Optional: Toggle favorite status
  toggleFavorite(event: Event) {
    event.stopPropagation(); // Prevent triggering goToDetails if card is clickable
    this.PropertyFavorite.emit(this.property.id);
  }

  // Optional: Quick contact agent
  contactAgent(event: Event) {
    event.stopPropagation(); // Prevent triggering goToDetails if card is clickable
    this.PropertyContact.emit(this.property.id);
  }

  // Utility methods for template
  getFirstImage(): string {
    return this.property.images?.[0] || this.property.imageUrl || 'assets/images/property-placeholder.jpg';
  }

  formatPrice(): string {
    if (!this.property.price) return 'Price on request';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(this.property.price);
  }

  formatArea(): string {
    if (!this.property.area) return '';
    return `${this.property.area.toLocaleString()} sq ft`;
  }

  calculatePricePerSqft(): string {
    if (!this.property.price || !this.property.area) return '';
    const pricePerSqft = this.property.price / this.property.area;
    return `$${Math.round(pricePerSqft).toLocaleString()}/sq ft`;
  }

  getPropertyTypeLabel(): string {
    // Map property type enum/string to display label
    switch (this.property.type?.toLowerCase()) {
      case 'apartment':
        return 'Apartment';
      case 'house':
        return 'House';
      case 'condo':
        return 'Condo';
      case 'villa':
        return 'Villa';
      case 'townhouse':
        return 'Townhouse';
      default:
        return this.property.type || 'Property';
    }
  }

  getStatusBadgeClass(): string {
    switch (this.property.status?.toLowerCase()) {
      case 'for-sale':
        return 'status-for-sale';
      case 'for-rent':
        return 'status-for-rent';
      case 'sold':
        return 'status-sold';
      case 'rented':
        return 'status-rented';
      default:
        return 'status-available';
    }
  }

  isNewListing(): boolean {
    if (!this.property.createdAt) return false;
    const createdDate = new Date(this.property.createdAt);
    const daysSinceCreated = (Date.now() - createdDate.getTime()) / (1000 * 60 * 60 * 24);
    return daysSinceCreated <= 7; // Show "New" badge for listings less than 7 days old
  }

  // Handle image loading errors
  onImageError(event: any) {
    event.target.src = 'assets/images/property-placeholder.jpg';
  }

  // Truncate long descriptions
  getTruncatedDescription(maxLength: number = 100): string {
    if (!this.property.description) return '';
    return this.property.description.length > maxLength
      ? this.property.description.substring(0, maxLength) + '...'
      : this.property.description;
  }
}
*/
