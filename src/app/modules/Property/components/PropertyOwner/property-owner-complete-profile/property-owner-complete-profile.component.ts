import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import { PropertyOwnerService } from '../../../../../Services/Property/property-owner.service';


@Component({
  selector: 'app-property-owner-complete-profile',
  standalone: false,
  templateUrl: './property-owner-complete-profile.component.html',
  styleUrl: './property-owner-complete-profile.component.css'
})
export class PropertyOwnerCompleteProfileComponent {
  profileForm!: FormGroup;
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
    this.profileForm = this.fb.group({
      FirstName: [''],
      LastName: [''],
      Location: [''],
      Address: [''],
      City: [''],
      ProfileImg: [''],
      ModificationBy: [this.cookieService.get('Token')],

    });
  }

  submit() {
    const token = this.cookieService.get('Token');
    const formData = this.profileForm.value;

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
