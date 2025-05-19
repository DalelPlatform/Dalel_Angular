// import { Component, OnInit } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { ServiceProviderProfileService } from './service-provider-profile.service';
// import { CookieService } from 'ngx-cookie-service';
// import { Router } from '@angular/router';
// import { scheduleValidator } from './validators/schedule.validator';

// @Component({
//   selector: 'app-service-provider-profile',
//   standalone: false,
//   templateUrl: './service-provider-profile.component.html',
//   styleUrls: ['./service-provider-profile.component.css']
// })
// export class ServiceProviderProfileComponent implements OnInit {
//   profileForm!: FormGroup;
//   scheduleForm: FormGroup;
//   errorMessage: string = '';
//   daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
//   hours: string[] = [];
//   selectedFile: File | null = null;
//   previewUrl: string | ArrayBuffer | null = 'assets/placeholder.jpg';

//   constructor(
//     private fb: FormBuilder,
//     private profileService: ServiceProviderProfileService,
//     private http: HttpClient,
//     private cookieService: CookieService,
//     private router: Router
//   ) {
//     this.profileForm = this.fb.group({
//       image: [null, Validators.required],
//       about: ['', [Validators.required, Validators.minLength(50)]],
//       website: ['', Validators.pattern(/https?:\/\/.+/)]
      
//     });

//     this.scheduleForm = this.fb.group({
//       price: ['', [Validators.required, Validators.min(1)]],
//       priceUnit: ['per_hour', Validators.required],
//       schedules: this.fb.array([], scheduleValidator())
//     });

//     // Initialize hours (8:00 AM to 8:00 PM)
//     for (let i = 8; i <= 20; i++) {
//       this.hours.push(`${i}:00`);
//     }
//   }

//   ngOnInit(): void {
//     this.initializeSchedules();
//     this.checkProfileCompletion();
//   }

//   get schedules(): FormArray {
//     return this.scheduleForm.get('schedules') as FormArray;
//   }

//   initializeSchedules(): void {
//     this.daysOfWeek.forEach(day => {
//       this.schedules.push(this.fb.group({
//         day: [day],
//         enabled: [false],
//         availableFrom: ['9:00'],
//         availableTo: ['17:00']
//       }));
//     });
//   }

//   checkProfileCompletion(): void {
//     this.profileService.checkProfileCompletion().subscribe({
//       next: (isComplete) => {
//         if (isComplete) {
//           this.router.navigate(['/account']);
//         }
//       },
//       error: (err) => {
//         this.errorMessage = 'Failed to check profile status. Please try again.';
//       }
//     });
//   }

//   onFileChange(event: any): void {
//     const file = event.target.files[0];
//     if (file) {
//       this.selectedFile = file;
//       this.profileForm.patchValue({ image: file });
      
//       // Create preview
//       const reader = new FileReader();
//       reader.onload = () => {
//         this.previewUrl = reader.result;
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   onSubmit(): void {
//     if (this.profileForm.invalid || this.scheduleForm.invalid) {
//       this.markAllAsTouched();
//       this.errorMessage = 'Please fill all required fields correctly.';
//       return;
//     }

//     const formData = new FormData();
//     formData.append('image', this.profileForm.get('image')?.value);
//     formData.append('about', this.profileForm.get('about')?.value);
//     formData.append('website', this.profileForm.get('website')?.value || '');
//     formData.append('price', this.scheduleForm.get('price')?.value);
//     formData.append('priceUnit', this.scheduleForm.get('priceUnit')?.value);
    
//     const schedules = this.scheduleForm.get('schedules')?.value;
//     formData.append('schedules', JSON.stringify(schedules));

//     this.profileService.saveProfile(formData).subscribe({
//       next: () => {
//         this.router.navigate(['/account']);
//       },
//       error: (err) => {
//         this.errorMessage = 'Failed to save profile. Please try again.';
//       }
//     });
//   }

//   private markAllAsTouched(): void {
//     Object.values(this.profileForm.controls).forEach(control => {
//       control.markAsTouched();
//     });
//     Object.values(this.scheduleForm.controls).forEach(control => {
//       control.markAsTouched();
//     });
//   }
// }
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-service-provider-profile',
//   templateUrl: './service-provider-profile.component.html',
//   styleUrls: ['./service-provider-profile.component.css']
// })
// export class ServiceProviderProfileComponent implements OnInit {
//   profileForm: FormGroup;
//   daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   saveError: string | null = null;
//   userId: string | null = null;
//   userName: string | null = null;
//   role: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private cookieService: CookieService
//   ) {
//     this.profileForm = this.fb.group({
//       image: [null, Validators.required],
//       about: ['', [Validators.required, Validators.minLength(10)]],
//       website: ['', [Validators.pattern('https?://.+')]],
//       price: ['', [Validators.required, Validators.min(0)]],
//       priceUnit: ['per hour', Validators.required],
//       schedules: this.fb.array(this.daysOfWeek.map(() => this.createScheduleGroup()))
//     });
//   }

//   ngOnInit(): void {
//     this.role = this.cookieService.get('Role');
//     this.userId = this.cookieService.get('UserId');
//     this.userName = this.cookieService.get('UserName');

//     if (!this.userId || !this.userName || this.role !== 'ServiceProvider') {
//       this.router.navigate(['/unauthorized']);
//       return;
//     }

//     this.checkProfileCompleteness();
//   }

//   createScheduleGroup(): FormGroup {
//     return this.fb.group({
//       enabled: [false],
//       availableFrom: [''],
//       availableTo: ['']
//     });
//   }

//   get schedules(): FormArray {
//     return this.profileForm.get('schedules') as FormArray;
//   }

//   onFileChange(event: Event): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
//       this.profileForm.patchValue({ image: file });
//       this.profileForm.get('image')?.updateValueAndValidity();
//     }
//   }

//   checkProfileCompleteness(): void {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.cookieService.get('Token')}`
//     });

//     this.http.get(`api/serviceprovider/check-profile/${this.userId}`, { headers }).subscribe({
//       next: (response: any) => {
//         if (response.Success && response.Data) {
//           this.router.navigate(['/account']);
//         }
//       },
//       error: (error) => {
//         console.error('Error checking profile completeness:', error);
//       }
//     });
//   }

//   onSubmit(): void {
//     if (this.profileForm.invalid || !this.userId || !this.userName) {
//       this.profileForm.markAllAsTouched();
//       return;
//     }

//     const token = this.cookieService.get('Token');
//     const formData = new FormData();
//     formData.append('Image', this.profileForm.get('image')?.value);
//     formData.append('UserName', this.userName);
//     formData.append('About', this.profileForm.get('about')?.value);
//     formData.append('Website', this.profileForm.get('website')?.value);
//     formData.append('Price', this.profileForm.get('price')?.value);
//     formData.append('PriceUnit', this.profileForm.get('priceUnit')?.value);

//     const scheduleData = this.schedules.value
//       .map((schedule: any, index: number) => ({
//         WorKDay: index,
//         AvailableFrom: schedule.enabled ? schedule.availableFrom : null,
//         AvailableTo: schedule.enabled ? schedule.availableTo : null
//       }))
//       .filter((schedule: any) => schedule.AvailableFrom && schedule.AvailableTo);

//     formData.append('Schedules', JSON.stringify(scheduleData));

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     this.http.post('api/serviceprovider/create', formData, { headers }).subscribe({
//       next: (response: any) => {
//         if (response.Success) {
//           this.router.navigate(['/account']);
//         } else {
//           this.saveError = response.Message || 'Failed to save profile.';
//         }
//       },
//       error: (error) => {
//         this.saveError = error.error?.Message || 'An error occurred while saving the profile.';
//       }
//     });

//     const schedulePayload = {
//       ServiceProviderId: this.userId,
//       Schedules: scheduleData
//     };

//     this.http.put('api/serviceproviderschedule/update', schedulePayload, { headers }).subscribe({
//       next: (response: any) => {
//         if (!response.Success) {
//           this.saveError = response.Message || 'Failed to save schedule.';
//         }
//       },
//       error: (error) => {
//         this.saveError = error.error?.Message || 'An error occurred while saving the schedule.';
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  standalone: false,
  selector: 'app-service-provider-profile',
  templateUrl: './service-provider-profile.component.html',
  styleUrls: ['./service-provider-profile.component.css']
})
export class ServiceProviderProfileComponent implements OnInit {
  profileForm: FormGroup;
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  hours: string[] = [];
  saveError: string | null = null;
  userId: string | null = null;
  userName: string | null = null;
  role: string | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    this.hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    this.profileForm = this.fb.group({
      image: [null, Validators.required],
      about: ['', [Validators.required, Validators.minLength(50)]],
      website: ['', [Validators.pattern('https?://.+')]],
      price: ['', [Validators.required, Validators.min(1)]],
      priceUnit: ['per_hour', Validators.required],
      schedules: this.fb.array(this.daysOfWeek.map(() => this.createScheduleGroup()))
    });
  }

  ngOnInit(): void {
    this.role = this.cookieService.get('Role');
    this.userId = this.cookieService.get('UserId');
    this.userName = this.cookieService.get('UserName');

    if (!this.userId || !this.userName || this.role !== 'ServiceProvider') {
      this.router.navigate(['/unauthorized']);
      return;
    }

    this.checkProfileCompleteness();
  }

  createScheduleGroup(): FormGroup {
    return this.fb.group({
      enabled: [false],
      availableFrom: [''],
      availableTo: ['']
    });
  }

  get schedules(): FormArray {
    return this.profileForm.get('schedules') as FormArray;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileForm.patchValue({ image: file });
      this.profileForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  checkProfileCompleteness(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('Token')}`
    });

    this.http.get(`api/serviceprovider/check-profile/${this.userId}`, { headers }).subscribe({
      next: (response: any) => {
        if (response.Success && response.Data) {
          this.router.navigate(['/account']);
        }
      },
      error: (error) => {
        console.error('Error checking profile completeness:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid || !this.userId || !this.userName) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const token = this.cookieService.get('Token');
    const formData = new FormData();
    formData.append('Image', this.profileForm.get('image')?.value);
    formData.append('UserName', this.userName);
    formData.append('About', this.profileForm.get('about')?.value);
    formData.append('Website', this.profileForm.get('website')?.value);
    formData.append('Price', this.profileForm.get('price')?.value);
    formData.append('PriceUnit', this.profileForm.get('priceUnit')?.value);

    const scheduleData = this.schedules.value
      .map((schedule: any, index: number) => ({
        WorKDay: index,
        AvailableFrom: schedule.enabled ? schedule.availableFrom : null,
        AvailableTo: schedule.enabled ? schedule.availableTo : null
      }))
      .filter((s: any) => s.AvailableFrom && s.AvailableTo);

    formData.append('Schedules', JSON.stringify(scheduleData));

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('api/serviceprovider/create', formData, { headers }).subscribe({
      next: (response: any) => {
        if (response.Success) {
          this.router.navigate(['/account']);
        } else {
          this.saveError = response.Message || 'Failed to save profile.';
        }
      },
      error: (error) => {
        this.saveError = error.error?.Message || 'An error occurred while saving the profile.';
      }
    });

    const schedulePayload = {
      ServiceProviderId: this.userId,
      Schedules: scheduleData
    };

    this.http.put('api/serviceproviderschedule/update', schedulePayload, { headers }).subscribe({
      next: (response: any) => {
        if (!response.Success) {
          this.saveError = response.Message || 'Failed to save schedule.';
        }
      },
      error: (error) => {
        this.saveError = error.error?.Message || 'An error occurred while saving the schedule.';
      }
    });
  }
}
