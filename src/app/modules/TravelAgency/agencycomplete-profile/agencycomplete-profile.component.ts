import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-agencycomplete-profile',
  templateUrl: './agencycomplete-profile.component.html',
  styleUrl: './agencycomplete-profile.component.css',
  standalone: false
})
export class AgencycompleteProfileComponent {
  agencyForm!: FormGroup;
  currentStep: number = 1;
  steps: number[] = [1, 2, 3];
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private agencyService: AgencyService,
    private toastr: ToastrService,
  ) {
    this.initForm();
  }


  get progressPercentage(): number {
    return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
  }

  displayStep(step: number): void {
    if (step >= 1 && step <= this.steps.length) {
      this.currentStep = step;
    }
  }

  nextStep(): void {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  initForm() {
    this.agencyForm = this.fb.group({
      BusinessName: ['', Validators.required],
      Description: ['', Validators.required],
      ContactInfo: ['', Validators.required],
      BusinessCategory: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      BuildingNo: [null, Validators.required],
      Street: ['', Validators.required],
      Latitude: [null, Validators.required],
      Longitude: [null, Validators.required],
      VerificationStatus: [0],
      ownerId: [this.cookieService.get('Token')],

      VerificationDocument: this.fb.array([
        this.fb.group({
          DocumentType: [''],
          DocumentFile: [null, Validators.required],
          status: [0],
          AgencyId: [0]
        })
      ])
    });
  }
  get VerificationDocument() {
    return this.agencyForm.get('VerificationDocument') as FormArray;
  }

  onFileChange(event: any, index: number) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase() || 'unknown';
      this.VerificationDocument.at(index).patchValue({
        DocumentFile: file,
        DocumentType: extension
      });
    }
  }

  submit() {
    const token = this.cookieService.get('Token');
    const rawForm = this.agencyForm.value;
  const formData = new FormData();
  formData.append('BusinessName', rawForm.BusinessName);
  formData.append('Description', rawForm.Description);
  formData.append('ContactInfo', rawForm.ContactInfo);
  formData.append('BusinessCategory', rawForm.BusinessCategory);
  formData.append('Address', rawForm.Address);
  formData.append('City', rawForm.City);
  formData.append('BuildingNo', rawForm.BuildingNo);
  formData.append('Street', rawForm.Street);
  formData.append('Latitude', rawForm.Latitude);
  formData.append('Longitude', rawForm.Longitude);
  formData.append('VerificationStatus', rawForm.VerificationStatus);
  formData.append('ownerId', rawForm.ownerId);
  const doc = rawForm.VerificationDocument[0];
  formData.append('VerificationDocument[0].DocumentType', doc.DocumentType);
  formData.append('VerificationDocument[0].DocumentFile', doc.DocumentFile);
  formData.append('VerificationDocument[0].status', doc.status);
  formData.append('VerificationDocument[0].DocumentFileName', doc.name);
  console.log(doc)
  formData.append('VerificationDocument[0].AgencyId', doc.AgencyId);
  this.agencyService.registerAgency(formData,token).subscribe({
        next: (res) => {
          this.toastr.success(res.Message)
       
        },
        error: (err) => {
          console.log(err)
          if (err.status === 400 && err.error?.errors) {
    this.toastr.error("Please fill all data")
      }
       else if (err.status === 401) {
            this.toastr.error('Unauthorized access. Redirecting to login...')
      
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Failed to register agency. Please try again.');
      }

      }
    });
  }

}



