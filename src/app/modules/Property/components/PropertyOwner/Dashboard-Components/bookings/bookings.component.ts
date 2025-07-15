import { Component, OnInit } from '@angular/core';
import { IBookingProperty } from '../../../../Models/IBookingProperty';
import { PipesModule } from "../../../../../../shared/pipes/pipes.module";
import { BookingStatus } from '../../../../Models/enums/BookingStatus.enum';
import { PropertyOwnerService } from '../../../../../../Services/Property/property-owner.service';



@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css'],
  standalone: false,
})
export class BookingsComponent implements OnInit {
  activeTab: 'upcoming' | 'canceled' | 'completed' = 'upcoming';


  bookings: IBookingProperty[] = [];
  public BookingStatus = BookingStatus;

  constructor(private bookingService: PropertyOwnerService){}
  get filteredBookings() {
    if(this.activeTab === 'upcoming'){
      return this.bookings.filter(b => b.Status === BookingStatus.Pending || b.Status === BookingStatus.Confirmed);
    }
    if(this.activeTab === 'canceled'){
      return this.bookings.filter(b => b.Status === BookingStatus.Cancelled);
    }
    if(this.activeTab === 'completed'){
      return this.bookings.filter(b => b.Status === BookingStatus.Done);
    }
    return this.bookings;
  }

  setTab(tab: 'upcoming' | 'canceled' | 'completed') {
    this.activeTab = tab;




  }

  acceptBooking(id: number) {
    this.bookingService.acceptBooking(id).subscribe((res) => {
      console.log(res);
      this.reloadBookings();
    });
  }

  rejectBooking(id: number) {
    this.bookingService.rejectBooking(id).subscribe((res) => {
      console.log(res);
      this.reloadBookings();
    });
  }

  reloadBookings() {
    this.bookingService.getAllBookings().subscribe((res) => {
      this.bookings = res.Data;
      console.log(res);
      console.log(this.bookings);
    });
  }

  ngOnInit() {
    this.setTab('upcoming');
    this.reloadBookings();
  }

}
