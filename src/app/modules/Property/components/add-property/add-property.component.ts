import { Component } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {PropertyOwnerService} from '../../../../Services/Property/property-owner.service';

@Component({
  selector: 'app-add-property',
  standalone:false,
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
  propertyForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private propertyService: PropertyOwnerService,
  ) {
    this.initForm();
  }
  initForm() {
    this.propertyForm = this.fb.group({
      Description: [''],
      Amenities: [''],
      NumberOfRooms: [''],
      BuildingNo: [''],
      FloorNo: [''],
      Address: [''],
      City: [0],
      Region: [0],
      Street: [0],
      Latitude: [0],
      Longitude: [0],
      PhoneNumber: [0],
      CancelationOptions: [false],
      IsForRent: [false],
      VerificationStatus: [0],
      CancelationCharges: [0],
      OwnerId: [this.cookieService.get('Token')],

      //   VerificationDocument: this.fb.array([
      //     this.fb.group({
      //       DocumentType: [''],
      //       DocumentFile: [''],
      //       status: [0],
      //       PropertyId: [0]
      //     })
      //   ])

    });
  }

  submit() {
    const token = this.cookieService.get('Token');
    const formData = this.propertyForm.value;

    this.propertyService.registerProperty(formData,token).subscribe({
      next: () => {
        alert("Property registered successfully!");
      },
      error: err => {
        console.error(err);
        alert("Failed to register Property.");
      }
    });
  }
}
