import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../../environments/environment';
import { AgencyService } from '../agency.service';

@Component({
  selector: 'app-agencycomplete-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './agencycomplete-profile.component.html',
  styleUrl: './agencycomplete-profile.component.css'
})
export class AgencycompleteProfileComponent {
   agencyForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
     private cookieService: CookieService,
        private agencyService: AgencyService
  ) {
    this.initForm();
  }
  initForm() {
    this.agencyForm = this.fb.group({
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
          AgencyId: [0]
        })
      ])
    });
  }

  submit() {
     const token = this.cookieService.get('Token');
    const formData = this.agencyForm.value;

  this.agencyService.registerAgency(formData,token).subscribe({
        next: () => {
          alert("Agency registered successfully!");
        },
        error: err => {
          console.error(err);
          alert("Failed to register agency.");
        }
      });
  }
}



