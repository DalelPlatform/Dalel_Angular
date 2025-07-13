
import { Component, OnInit} from '@angular/core';
import { PropertyOwnerService } from '../../../../../Services/Property/property-owner.service';
import { IProperty } from '../../../Models/IProperty';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-test-search',
  standalone: false,
  templateUrl: './test-search.component.html',
  styleUrls: ['./test-search.component.css']
})
export class TestSearchComponent implements OnInit {
  list: IProperty[] = [];

  // Search form data
  searchData = {
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    rooms: 1
  };

  // Filter data
  filters = {
    hotelName: '',
    priceRange: { min: 700, max: 1500 },
    customerRating: null,
    starRating: null,
    hotelType: '',
    amenities: {
      airConditioning: false,
      roomServices: false,
      dining: false,
      caretaker: false,
      freeInternet: false,
      businessService: false,
      bonfire: false,
      mask: false,
      spa: false,
      swimmingPool: false,
      fitnessCentre: false,
      bar: false
    }
  };

  showFilters = false;

  constructor(private service: PropertyOwnerService) {}

  ngOnInit() {
    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    this.searchData.checkIn = this.formatDate(today);
    this.searchData.checkOut = this.formatDate(tomorrow);
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  searchProperties() {
    const searchTerm = this.searchData.location || '';
    this.service.getProperties(searchTerm,'').subscribe({
      next: (res) => {
        this.list = res.Data.Data;
        console.log(res.Data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  applyFilters() {
    // Apply filter logic here
    this.showFilters = false;
    this.searchProperties();
  }

  clearAllFilters() {
    this.filters = {
      hotelName: '',
      priceRange: { min: 700, max: 1500 },
      customerRating: null,
      starRating: null,
      hotelType: '',
      amenities: {
        airConditioning: false,
        roomServices: false,
        dining: false,
        caretaker: false,
        freeInternet: false,
        businessService: false,
        bonfire: false,
        mask: false,
        spa: false,
        swimmingPool: false,
        fitnessCentre: false,
        bar: false
      }
    };
  }

  setCustomerRating(rating: number) {
  }

  setStarRating(rating: number) {
  }
}
