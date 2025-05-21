import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { PropertyOwnerService } from '../../../../Services/Property/property-owner.service';


@Component({
  selector: 'app-property-owner-complete-profile',
  standalone: false,
  templateUrl: './property-owner-complete-profile.component.html',
  styleUrl: './property-owner-complete-profile.component.css'
})
export class PropertyOwnerCompleteProfileComponent {
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
      BusinessName: [''],
      Description: [''],
      ContactInfo: [''],
      BusinessCategory: [''],
      Address: [''],
      City: [''],
      BuildingNo: [0],
      Street: [''],
      Latitude: [0],
      Longitude: [0],
      VerificationStatus: [0],
      ownerId: [this.cookieService.get('Token')],

      VerificationDocument: this.fb.array([
        this.fb.group({
          DocumentType: [''],
          DocumentFile: [''],
          status: [0],
          PropertyId: [0]
        })
      ])
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
