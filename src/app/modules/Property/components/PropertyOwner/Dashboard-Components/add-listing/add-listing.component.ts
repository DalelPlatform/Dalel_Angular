import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from 'ngx-cookie-service';
import {PropertyOwnerService} from '../../../../../../Services/Property/property-owner.service';
import {ActivatedRoute, Router} from '@angular/router';
import {VerificationStatus} from '../../../../Models/IProperty';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ToastrService } from 'ngx-toastr';





@Component({
  selector: 'app-add-listing',
  standalone: false,
  templateUrl: './add-listing.component.html',
  styleUrl: './add-listing.component.css'
})
export class AddListingComponent implements OnInit, AfterViewInit{

  cookies = inject(CookieService);
  addPropertyForm: FormGroup;
  fb = inject(FormBuilder);
  propertyService = inject(PropertyOwnerService);
  sendForm: FormData = new FormData();
  isEditMode: boolean = false;
  propertyId: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService) {
    this.addPropertyForm = this.fb.group({
      Description: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]],

      Amenities: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(300)
      ]],

      PricePerNight: [0, [
        Validators.required,
        Validators.min(1)
      ]],

      NumberOfRooms: [0, [
        Validators.required,
        Validators.min(1)
      ]],

      BuildingNo: [0, [
        Validators.required
      ]],

      FloorNo: [0, [
        Validators.required
      ]],

      Address: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(250)
      ]],

      City: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],

      Region: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]],

      Street: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(150)
      ]],

      Latitude: [0, [
        Validators.required,
        Validators.min(-90),
        Validators.max(90)
      ]],

      Longitude: [0, [
        Validators.required,
        Validators.min(-180),
        Validators.max(180)
      ]],

      PhoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\d{11}$/)
      ]],

      CancelationOptions: [false],

      IsForRent: [false],

      VerificationStatus: [VerificationStatus.Pending],

      CancelationCharges: [0, [
        Validators.min(0)
      ]],

      Images: [[]]
    });
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.params['id'];
    if (this.propertyId) {
      this.isEditMode = true;
      this.propertyService.getProperty(this.propertyId).subscribe((res) => {
        this.addPropertyForm.patchValue(res.data);
        
      });
    }
  }


  ngAfterViewInit(): void {
    const map = L.map('map').setView([24.0889, 32.8998], 12); // Default center (Aswan)
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    let marker: L.Marker;
  
    map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;
  
      // Update form controls
      this.addPropertyForm.patchValue({
        Latitude: lat,
        Longitude: lng
      });
  
      if (marker) {
        marker.setLatLng(e.latlng);
      } else {
        marker = L.marker(e.latlng, { draggable: true }).addTo(map);
  
        // Update on drag
        marker.on('dragend', (event: L.DragEndEvent) => {
          const position = (event.target as L.Marker).getLatLng();
          this.addPropertyForm.patchValue({
            Latitude: position.lat,
            Longitude: position.lng
          });
        });
      }
    });
  }
  
  get formControls() {
    return this.addPropertyForm.controls;
  }

  get isCancellationOptionsEnabled(): boolean {
    return this.addPropertyForm.get('CancelationOptions')?.value || false;
  }

  onCancellationOptionsChange(): void {
    const cancelationChargesControl = this.addPropertyForm.get('CancelationCharges');
    if (this.isCancellationOptionsEnabled) {
      cancelationChargesControl?.setValidators([Validators.required, Validators.min(0)]);
    } else {
      cancelationChargesControl?.setValidators([Validators.min(0)]);
      cancelationChargesControl?.setValue(0);
    }
    cancelationChargesControl?.updateValueAndValidity();
  }

  ChooseFile(event: any) {
    event.preventDefault();
    const files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.sendForm.append('PropertyImages', files[i], files[i].name);
    }
    console.log('Files added to FormData:', files.length);
  }

  addPropertyFun() {
  if (this.addPropertyForm.valid) {
    console.log(this.addPropertyForm.value);
    const token = this.cookies.get('Token');

    // Append form values to FormData
    const formValue = this.addPropertyForm.value;
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        this.sendForm.append(key, formValue[key]);
      }
    }

    if (this.isEditMode && this.propertyId) {
      // Update existing property
      this.propertyService.updateProperty(this.sendForm, this.propertyId).subscribe({
        next: () => {
          this.toastr.success("Property updated successfully!");
          this.router.navigate(['/owner/listings']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Failed to update property");
        }
      });
    } else {
      // Add new property
      this.propertyService.registerProperty(this.sendForm, token).subscribe({
        next: () => {
          this.toastr.success("Property added successfully!");
          this.router.navigate(['/owner/listings']);
        },
        error: (err) => {
          console.error(err);
          this.toastr.error("Failed to add property");
        }
      });
    }
  } else {
    Object.keys(this.addPropertyForm.controls).forEach(key => {
      this.addPropertyForm.get(key)?.markAsTouched();
    });
  }
}
}
