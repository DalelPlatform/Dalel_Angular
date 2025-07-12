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
  const formData = new FormData();

  // Append basic fields from the form
  formData.append('BusinessName', this.agencyForm.get('BusinessName')?.value);
  formData.append('Description', this.agencyForm.get('Description')?.value);
  formData.append('ContactInfo', this.agencyForm.get('ContactInfo')?.value);
  formData.append('BusinessCategory', this.agencyForm.get('BusinessCategory')?.value);
  formData.append('Address', this.agencyForm.get('Address')?.value);
  formData.append('City', this.agencyForm.get('City')?.value);
  formData.append('BuildingNo', this.agencyForm.get('BuildingNo')?.value);
  formData.append('Street', this.agencyForm.get('Street')?.value);
  formData.append('Latitude', this.agencyForm.get('Latitude')?.value);
  formData.append('Longitude', this.agencyForm.get('Longitude')?.value);
  formData.append('VerificationStatus', this.agencyForm.get('VerificationStatus')?.value);
  formData.append('ownerId', this.agencyForm.get('ownerId')?.value);

  // Loop through all documents in FormArray
  this.VerificationDocument.controls.forEach((docGroup, index) => {
    const docValue = docGroup.value;
    const file: File = docGroup.get('DocumentFile')?.value;

    if (file) {
      formData.append(`VerificationDocument[${index}].DocumentFile`, file, file.name);
      formData.append(`VerificationDocument[${index}].DocumentFileName`, file.name);
    }

    formData.append(`VerificationDocument[${index}].DocumentType`, docValue.DocumentType);
    formData.append(`VerificationDocument[${index}].status`, docValue.status);
    formData.append(`VerificationDocument[${index}].keepPrevious`, docValue.keepPrevious ?? false);
    formData.append(`VerificationDocument[${index}].AgencyId`, docValue.AgencyId);
  });

  // Submit to backend
  this.agencyService.registerAgency(formData, token).subscribe({
    next: (res) => {
      this.toastr.success(res.Message);
      // this.router.navigate(['/success']); // Uncomment if needed
    },
    error: (err) => {
      console.log(err);
      if (err.status === 400 && err.error?.errors) {
        this.toastr.error("Please fill all required fields.");
      } else if (err.status === 401) {
        this.toastr.error('Unauthorized access');
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Failed to register agency. Please try again.');
      }
    }
  });
}



}



