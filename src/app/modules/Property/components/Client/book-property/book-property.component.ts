import { Component } from '@angular/core';

export interface BookingData {
  bookingId: string;
  bookedBy: string;
  paymentMethod: string;
  totalPrice: number;
  date: string;
  departureDate: string;
  guests: number;
  tripTitle: string;
  imageUrl: string;
}

@Component({
  selector: 'app-book-property',
  templateUrl: './book-property.component.html',
  styleUrls: ['./book-property.component.css']
})
export class BookPropertyComponent {
  
  bookingData: BookingData = {
    bookingId: 'BS-58678',
    bookedBy: 'Frances Guerrero',
    paymentMethod: 'Credit card',
    totalPrice: 1200,
    date: '29 July 2022',
    departureDate: '15 Aug 2022',
    guests: 3,
    tripTitle: 'Beautiful Bali with Malaysia',
    imageUrl: 'assets/images/bali-temple.jpg'
  };

  constructor() { }

  onShare(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Booking Confirmation',
        text: `Your trip "${this.bookingData.tripTitle}" has been booked!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      this.copyToClipboard();
    }
  }

  onDownloadPDF(): void {
    // Implementation for PDF download
    console.log('Downloading PDF...');
    // You can integrate with libraries like jsPDF or html2pdf
  }

  private copyToClipboard(): void {
    const bookingInfo = `
      Booking Confirmation
      Trip: ${this.bookingData.tripTitle}
      Booking ID: ${this.bookingData.bookingId}
      Booked by: ${this.bookingData.bookedBy}
      Date: ${this.bookingData.date}
      Departure Date: ${this.bookingData.departureDate}
      Guests: ${this.bookingData.guests}
      Total Price: $${this.bookingData.totalPrice}
    `;
    
    navigator.clipboard.writeText(bookingInfo).then(() => {
      alert('Booking details copied to clipboard!');
    });
  }

  formatPrice(price: number): string {
    return `$${price.toLocaleString()}`;
  }
}

