import { Component, OnInit } from '@angular/core';

interface Booking {
  id: number;
  name: string;
  type: string;
  date: string;
  status: string;
  payment: string;
}

interface Listing {
  id: number;
  name: string;
  address: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-property-owner-layout',
  templateUrl: './property-owner-layout.component.html',
  styleUrl: './property-owner-layout.component.css',
  standalone:false,
})
export class PropertyOwnerLayoutComponent implements OnInit {
  activeTab: string = 'dashboard';
  searchTerm: string = '';
  sortBy: string = '';
  
  bookings: Booking[] = [
    {
      id: 1,
      name: 'Deluxe Pool View',
      type: 'With Breakfast',
      date: 'Nov 22 - 25',
      status: 'Booked',
      payment: 'Full payment'
    },
    {
      id: 2,
      name: 'Deluxe Pool View with Breakfast',
      type: 'Free Cancellation | Breakfast only',
      date: 'Nov 24 - 28',
      status: 'Booked',
      payment: 'On Property'
    },
    {
      id: 3,
      name: 'Luxury Room with Balcony',
      type: 'Free Cancellation | Breakfast + Lunch/Dinner',
      date: 'Nov 24 - 28',
      status: 'Reserved',
      payment: 'Half Payment'
    }
  ];

  listings: Listing[] = [
    {
      id: 1,
      name: 'Pride moon Village Resort & Spa',
      address: '31J W Spark Street, California - 24578',
      price: 1586,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    },
    {
      id: 2,
      name: 'Royal Beach Resort',
      address: 'Manhattan street, London - 24578',
      price: 856,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    },
    {
      id: 3,
      name: 'Carina Beach Resort',
      address: '5855 W Century Blvd, Los Angeles - 90045',
      price: 1025,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    },
    {
      id: 4,
      name: 'Courtyard by Marriott New York',
      address: 'Manhattan street, London - 24578',
      price: 899,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800'
    },
    {
      id: 5,
      name: 'Sunset Paradise Hotel',
      address: '1245 Ocean Drive, Miami - 33139',
      price: 750,
      image: 'assets/images/resort5.jpg'
    }
  ];

  filteredBookings: Booking[] = [];
  showDropdown: { [key: number]: boolean } = {};

  constructor() { }

  ngOnInit(): void {
    this.filteredBookings = [...this.bookings];
    
    // Set active tab based on current route if needed
    // This would typically be handled by Angular Router
    const currentPath = window.location.pathname;
    if (currentPath.includes('bookings')) {
      this.activeTab = 'bookings';
    } else if (currentPath.includes('listings')) {
      this.activeTab = 'listings';
    } else if (currentPath.includes('activities')) {
      this.activeTab = 'activities';
    } else if (currentPath.includes('earnings')) {
      this.activeTab = 'earnings';
    } else if (currentPath.includes('reviews')) {
      this.activeTab = 'reviews';
    } else if (currentPath.includes('settings')) {
      this.activeTab = 'settings';
    }
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  getTabIcon(tab: string): string {
    const icons: { [key: string]: string } = {
      'dashboard': 'fas fa-chart-line',
      'listings': 'fas fa-list',
      'bookings': 'fas fa-bookmark',
      'activities': 'fas fa-bell',
      'earnings': 'fas fa-chart-bar',
      'reviews': 'fas fa-star',
      'settings': 'fas fa-cog'
    };
    return icons[tab] || 'fas fa-circle';
  }

  filterBookings(): void {
    if (!this.searchTerm.trim()) {
      this.filteredBookings = [...this.bookings];
    } else {
      const term = this.searchTerm.toLowerCase();
      this.filteredBookings = this.bookings.filter(booking => 
        booking.name.toLowerCase().includes(term) ||
        booking.type.toLowerCase().includes(term) ||
        booking.date.toLowerCase().includes(term) ||
        booking.status.toLowerCase().includes(term) ||
        booking.payment.toLowerCase().includes(term)
      );
    }
    
    // Apply sorting after filtering
    if (this.sortBy) {
      this.applySorting();
    }
  }

  sortBookings(): void {
    this.applySorting();
  }

  private applySorting(): void {
    if (!this.sortBy) return;

    this.filteredBookings.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'date':
          // Simple date comparison - in real app you'd parse dates properly
          return a.date.localeCompare(b.date);
        case 'status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
  }

  viewBooking(booking: Booking): void {
    console.log('Viewing booking:', booking);
    // In a real application, this would navigate to a booking detail page
    // or open a modal with booking details
    alert(`Viewing booking: ${booking.name}`);
  }

  addNewListing(): void {
    console.log('Adding new listing');
    // In a real application, this would navigate to add listing page
    // or open a modal for adding new listing
    alert('Add New Listing functionality would be implemented here');
  }

  editListing(listing: Listing): void {
    console.log('Editing listing:', listing);
    alert(`Edit listing: ${listing.name}`);
  }

  deleteListing(listing: Listing): void {
    console.log('Deleting listing:', listing);
    if (confirm(`Are you sure you want to delete ${listing.name}?`)) {
      this.listings = this.listings.filter(l => l.id !== listing.id);
      alert('Listing deleted successfully');
    }
  }

  toggleDropdown(listingId: number): void {
    // Close all other dropdowns
    Object.keys(this.showDropdown).forEach(key => {
      if (parseInt(key) !== listingId) {
        this.showDropdown[parseInt(key)] = false;
      }
    });
    // Toggle current dropdown
    this.showDropdown[listingId] = !this.showDropdown[listingId];
  }

  reportListing(listing: Listing): void {
    console.log('Reporting listing:', listing);
    alert(`Report listing: ${listing.name}`);
    this.showDropdown[listing.id] = false;
  }

  disableListing(listing: Listing): void {
    console.log('Disabling listing:', listing);
    alert(`Disable listing: ${listing.name}`);
    this.showDropdown[listing.id] = false;
  }
}