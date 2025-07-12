import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AgencyService } from '../../../Services/TravelAgency/agency.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-createPackage',
  templateUrl: './createPackage.component.html',
  styleUrls: ['./createPackage.component.css'],
  standalone:false
})
export class CreatePackageComponent{
  packageForm!: FormGroup;
 agencies: any[] = [];
errorMessages: { [key: string]: string[] } = {};
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private agencyService: AgencyService,
    private toastr: ToastrService,
  ) { 
        this.initForm();
    this.loadAgencies();
  }
  
 
   
  initForm() {
this.packageForm = this.fb.group({
      Name : ['', [Validators.required]],
      Description: ['',  Validators.required],
      Price : [null, Validators.required],
      Duration: [null],
      TermsPolicies: [''],
      AgencyId: ['', Validators.required],
       ImageFile: [null],
      //  ImagePath:[''],
      Steps: this.fb.array([
           this.fb.group({
        Name: [''],
        Description: [''],
        Duration: [null],
        Image: [''],
        ImageFile: [''],
   
      })
      ]),
      Schadules: this.fb.array([
          this.fb.group({
        Date: [""],
        SlotsAvailable: [null],
      
    
      })
      ])
})
  }
   get steps(): FormArray {
    return this.packageForm.get('Steps') as FormArray;
  }
addStep() {
  this.steps.push(this.fb.group({
    Name: [''],
    Description: [''],
    Duration: [null],
    Image: [''],
    ImageFile: ['']
  }));
}

removeStep(index: number) {
  this.steps.removeAt(index);
}
  get schedules(): FormArray {
    return this.packageForm.get('Schadules') as FormArray;
  }

addschedule() {
  this.schedules.push(this.fb.group({
     Date: [""],
        SlotsAvailable: [null],
  }));
}

removeschedule(index: number) {
  this.schedules.removeAt(index);
}

  
  loadAgencies() {
    this.agencyService.getMyAgencies(this.cookieService.get('Token')).subscribe({
      next: (res) => {
        this.agencies = res.Data
        console.log("agencies",this.agencies)
      },
      error: (err) => console.error(err)
    });
  }
    onFileChange(event: any, index?: number) {
      console.log(event)
    const file = event.target.files[0];
    if (!file) return;

  if (index !== undefined) {
 
    this.steps.at(index).patchValue({ ImageFile: file });
  } else {
    this.packageForm.patchValue({ ImageFile: file });
  }
  }

   submit() {
     const formData = new FormData();
     
  formData.append('Name', this.packageForm.get('Name')?.value);
  formData.append('Description', this.packageForm.get('Description')?.value);
  formData.append('Price', this.packageForm.get('Price')?.value);
  formData.append('Duration', this.packageForm.get('Duration')?.value);
  formData.append('TermsPolicies', this.packageForm.get('TermsPolicies')?.value);
  formData.append('AgencyId', this.packageForm.get('AgencyId')?.value);
  const mainImage = this.packageForm.get('ImageFile')?.value;
if (mainImage) {
  console.log(mainImage)
  formData.append('ImageFile', mainImage); 
}
const stepControls = (this.packageForm.get('Steps') as FormArray).controls;

stepControls.forEach((group, index) => {
  const step = group.value;

  formData.append(`Steps[${index}].Name`, step.Name);
  formData.append(`Steps[${index}].Description`, step.Description);
  formData.append(`Steps[${index}].Duration`, step.Duration?.toString());

  const file = group.get('ImageFile')?.value;
  if (file) {
    console.log("Appending ImageFile:", file);
    formData.append(`Steps[${index}].ImageFile`, file); 
  }
});


  const schadules = this.packageForm.get('Schadules')?.value;
  schadules.forEach((sch: any, index: number) => {
    formData.append(`Schadules[${index}].Date`, sch.Date);
    formData.append(`Schadules[${index}].SlotsAvailable`, sch.SlotsAvailable?.toString());
  });
       const token = this.cookieService.get('Token');

     if (this.packageForm.valid){
      
 this.agencyService.addPackage(formData,token).subscribe({
 
    next: (res) => {
      console.log("this is res",res)
      this.errorMessages = {}
          this.toastr.success(res.Message)
       
        },
        error: (err) => {
          console.log(err.error.errors)
          if (err.status === 400 && err.error?.errors) {
            this.errorMessages = err.error.errors ||{}
       this.toastr.error("Please fill all data")
      }
       else if (err.status === 401) {
            this.toastr.error('Unauthorized access')

      
        this.router.navigate(['/login']);
      } else {
        this.toastr.error('Failed to register agency. Please try again.');
      }

      }
     
    })
     console.log(this.errorMessages)
     }
   
   }
}
