import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-UpdateAgency',
  templateUrl: './UpdateAgency.component.html',
  styleUrls: ['./UpdateAgency.component.css'],
  standalone: false
})
export class UpdateAgencyComponent implements OnInit {
  agency: any;
  agencyForm!: FormGroup;
  agencyId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agencyService: AgencyService,
    private cookieService: CookieService,
    private toastr: ToastrService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.agencyId = Number(this.route.snapshot.paramMap.get('Id'));
    const token = this.cookieService.get('Token');

    this.agencyService.getAgencyById(token, this.agencyId).subscribe({
      next: (res) => {
        this.agency = res.Data;

        if (this.agency) {
          this.agencyForm.patchValue(this.agency);

          if (this.agency.VerificationDocument?.length > 0) {
            this.VerificationDocument.clear();

            this.agency.VerificationDocument.forEach((doc: any) => {
              this.VerificationDocument.push(this.fb.group({
                DocumentType: [doc.DocumentType],
                DocumentFile: [null],
                DocumentFileName: [doc.DocumentFileName],
                status: [doc.status],
                AgencyId: [doc.AgencyId],
                 keepPrevious: [true]
              }));
            });
          }
        }
      },
      error: () => {
        this.toastr.error('Failed to load agency data');
      }
    });
  }

  initForm(): void {
    this.agencyForm = this.fb.group({
      BusinessName: [''],
      Description: [''],
      ContactInfo: [''],
      BusinessCategory: [''],
      Address: [''],
      City: [''],
      BuildingNo: [null],
      Street: [''],
      Latitude: [null],
      Longitude: [null],
      VerificationStatus: [0],
      ownerId: [this.cookieService.get('Token')],
      VerificationDocument: this.fb.array([
        this.fb.group({
          DocumentType: [''],
          DocumentFile: [null],
          DocumentFileName: [''],
          status: [0],
          AgencyId: [0],
          keepPrevious: [true] 
        })
      ])
    });
  }

  get VerificationDocument(): FormArray {
    return this.agencyForm.get('VerificationDocument') as FormArray;
  }

  onFileChange(event: any, index: number): void {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const extension = file.name.split('.').pop()?.toLowerCase() || 'unknown';

      this.VerificationDocument.at(index).patchValue({
        DocumentFile: file,
        DocumentType: extension,
        DocumentFileName: file.name,
      });
    }
  }

  submit(): void {
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
    formData.append('keepPrevious', rawForm.keepPrevious ? 'true' : 'false'); // ✅ Include keepPrevious

    rawForm.VerificationDocument.forEach((doc: any, index: number) => {
      formData.append(`VerificationDocument[${index}].status`, doc.status);
      formData.append(`VerificationDocument[${index}].AgencyId`, doc.AgencyId);

      if (doc.DocumentFile) {
        const file = doc.DocumentFile;
        const extension = file.name.split('.').pop()?.toLowerCase() || 'unknown';

        formData.append(`VerificationDocument[${index}].DocumentFile`, file);
        formData.append(`VerificationDocument[${index}].DocumentFileName`, file.name);
        formData.append(`VerificationDocument[${index}].DocumentType`, extension);
      } else {
        formData.append(`VerificationDocument[${index}].DocumentFileName`, doc.DocumentFileName || '');
        formData.append(`VerificationDocument[${index}].DocumentType`, doc.DocumentType || '');
      }
    });

    this.agencyService.updatetravelAgency(this.agencyId, formData, token).subscribe({
      next: (res) => {
        this.toastr.success(res.Message);
      },
      error: (err) => {
        console.log(err);
        if (err.status === 400 && err.error?.errors) {
          this.toastr.error("Please fill all data");
        } else if (err.status === 401) {
          this.toastr.error('Unauthorized access');
          this.router.navigate(['/login']);
        } else {
          this.toastr.error('Failed to update agency. Please try again.');
        }
      }
    });
  }
}
