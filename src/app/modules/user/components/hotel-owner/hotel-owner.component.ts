import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HotelOwnerService } from '../../services/hotel-owner.service';
import { HotelCreationRequest } from '../../models/HotelCreationRequest.model';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-hotel-owner',
  templateUrl: './hotel-owner.component.html',
  styleUrls: ['./hotel-owner.component.css']
})
export class HotelOwnerComponent {
  hotel: HotelCreationRequest = {
    Name: '',
    Description: '',
    City: '',
    Street: '',
    Address: '',
    Latitude: 0,
    Longitude: 0,
    PhoneNumber: '',
    CancelationOptions: false,
    CancelationCharges: 0
  };

  serverMessage = '';
  isSubmitting = false;

  constructor(
    private hotelSrv: HotelOwnerService,
    private router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.serverMessage = 'Please fix validation errors.';
      return;
    }
    this.isSubmitting = true;
    this.hotelSrv.addHotel(this.hotel).subscribe({
      next: res => {
        this.serverMessage = res.Message;
        if (res.Success) {
          alert('Hotel added successfully');
          this.router.navigate(['/hotel-owner']);
        } else {
          this.isSubmitting = false;
        }
      },
      error: () => {
        this.serverMessage = 'Failed to add hotel';
        this.isSubmitting = false;
      }
    });
  }
}