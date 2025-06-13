// import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Router } from '@angular/router';
// import { CookieService } from 'ngx-cookie-service';

// @Component({
//   selector: 'app-complete-profile-service-provider',
//   standalone: false,
//   templateUrl: './complete-profile-service-provider.component.html',
//   styleUrls: ['./complete-profile-service-provider.component.css']
// })
// export class CompleteProfileServiceProviderComponent implements OnInit {
//   profileForm!: FormGroup;
//   currentStep: number = 1;
//   steps: number[] = [1, 2, 3, 4];
//   saveError: string | null = null;
//   categoriesList: string[] = [];
//   userId: string | null = null;

//   constructor(
//     private fb: FormBuilder,
//     private http: HttpClient,
//     private router: Router,
//     private cookieService: CookieService,
//     private cdRef: ChangeDetectorRef 
//   ) {
//     this.initForm();
//   }

// ngOnInit(): void {
//     this.checkProfileCompleteness();
//     this.loadCategories();
//     this.fetchUserId();
//   }
//   fetchUserId(): void {
//     const token = this.cookieService.get('Token');
//     if (!token) {
//       this.saveError = 'No token found. Please log in again.';
//       return;
//     }

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     // طلب GET للـ endpoint اللي عندك
//     this.http.get<{ Success: boolean, Data: any, Message: string }>('http://localhost:5070/api/ServiceProvider/profile', { headers }).subscribe({
//       next: (response) => {
//         if (response.Success && response.Data) {
//           this.userId = response.Data.userId; 
//           console.log('UserId fetched:', this.userId);
//         } else {
//           this.saveError = response.Message || 'Failed to fetch user ID.';
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching user ID:', error);
//         this.saveError = 'Failed to fetch user ID.';
//       }
//     });
//   }

//   loadCategories(): void {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.cookieService.get('Token')}`
//     });

//     // Expecting an object with Success, Data, and Message
//     this.http.get<{ Success: boolean, Data: string[], Message: string }>('http://localhost:5070/api/CategoryServices/categories', { headers }).subscribe({
//       next: (response) => {
//         if (response.Success) {
//           this.categoriesList = response.Data;
//           this.cdRef.detectChanges();
//         } else {
//           this.saveError = response.Message || 'Failed to load categories.';
//         }
//       },
//       error: (error) => {
//         console.error('Error fetching categories:', error);
//         this.saveError = 'Failed to load categories.';
//       }
//     });
// }

//   get progressPercentage(): number {
//     return ((this.currentStep - 1) / (this.steps.length - 1)) * 100;
//   }

//   displayStep(step: number): void {
//     if (step >= 1 && step <= this.steps.length) {
//       this.currentStep = step;
//     }
//   }

//   nextStep(): void {
//     if (this.currentStep < this.steps.length) {
//       this.currentStep++;
//     }
//   }

//   prevStep(): void {
//     if (this.currentStep > 1) {
//       this.currentStep--;
//     }
//   }

//   initForm() {
//     this.profileForm = this.fb.group({
//       // Step 1: Business Location
//       country: ['', Validators.required],
//       city: ['', Validators.required],
//       district: ['', Validators.required],
//       zipCode: ['', Validators.required],
//       addressLine: ['', Validators.required],
//       serviceAreas: ['', Validators.required],

//       // Step 2: Choose Services (only categories now)
//       categories: ['', Validators.required], // Dropdown field

//       // Step 3: Profile Details
//       image: [null, Validators.required],
//       about: ['', [Validators.required, Validators.minLength(50)]],
//       website: ['', [Validators.pattern('https?://.+')]],

//       // Step 4: Price and Hours
//       price: ['', [Validators.required, Validators.min(1)]],
//       priceUnit: ['per_hour', Validators.required],
//       schedules: this.fb.array(this.getInitialSchedules())
//     });
//   }

//   get schedules(): FormArray {
//     return this.profileForm.get('schedules') as FormArray;
//   }

//   getInitialSchedules(): FormGroup[] {
//     const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//     return days.map(() => this.fb.group({
//       enabled: [true],
//       availableFrom: ['09:00', Validators.required],
//       availableTo: ['17:00', Validators.required]
//     }));
//   }

//   getHours(): string[] {
//     return Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
//   }

//   onFileChange(event: Event, field: string): void {
//     const input = event.target as HTMLInputElement;
//     if (input.files && input.files.length > 0) {
//       const file = input.files[0];
//       this.profileForm.patchValue({ [field]: file });
//     }
//   }

//   checkProfileCompleteness(): void {
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${this.cookieService.get('Token')}`
//     });
//     this.http.get(`http://localhost:5070/api/Serviceprovider/check-profile`, { headers, responseType: 'text' }).subscribe({
//       next: (response: string) => {
//         try {
//           const data = JSON.parse(response);
//           if (data.Success && data.Data) {
//             this.router.navigate(['/account']);
//           }
//         } catch (e) {
//           this.saveError = 'Invalid response from server.';
//         }
//       },
//       error: (error) => {
//         this.saveError = 'Failed to check profile completeness.';
//       }
//     });
//   }

//   onSubmit(): void {
//     const token = this.cookieService.get('Token');
//     if (!token) {
//       this.saveError = 'No token found. Please log in again.';
//       return;
//     }
//     if (!this.userId) {
//       this.saveError = 'UserId not fetched yet. Please wait or try again.';
//       return;
//     }    
//     const formData = new FormData();
//     // formData.append('UserId', this.userId); 
//     formData.append('City', this.profileForm.get('city')?.value);
//     formData.append('District', this.profileForm.get('district')?.value);
//     formData.append('ZipCode', this.profileForm.get('zipCode')?.value);
//     formData.append('Address', this.profileForm.get('addressLine')?.value);
//     formData.append('ServiceArea', this.profileForm.get('serviceAreas')?.value);
//     formData.append('CategoryServicesId', this.profileForm.get('categories')?.value);
//     formData.append('Image', this.profileForm.get('image')?.value);
//     formData.append('About', this.profileForm.get('about')?.value);
//     formData.append('Website', this.profileForm.get('website')?.value);
//     formData.append('Price', this.profileForm.get('price')?.value);
//     formData.append('PriceUnit', this.profileForm.get('priceUnit')?.value);
//         console.log('FormData:', formData); 

// const scheduleData = this.schedules.value
//   .map((schedule: any, index: number) => ({
//     WorkDay: index,
//     AvailableFrom: schedule.enabled ? schedule.availableFrom : null,
//     AvailableTo: schedule.enabled ? schedule.availableTo : null
//   }))
//   .filter((s: any) => s.AvailableFrom && s.AvailableTo);

// scheduleData.forEach((s:any, i: number) => {
//   formData.append(`Schedules[${i}].WorkDay`, s.WorkDay.toString());
//   formData.append(`Schedules[${i}].AvailableFrom`, s.AvailableFrom);
//   formData.append(`Schedules[${i}].AvailableTo`, s.AvailableTo);
// });

//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });

//     this.http.put('http://localhost:5070/api/Serviceprovider/create', formData, { headers }).subscribe({
//       next: (response: any) => {
//         if (response.Success) {
//           alert('Profile saved successfully!');
//           this.router.navigate(['/account']);
//         } else {
//           this.saveError = response.Message || 'Failed to save profile.';
//         }
//       },
//       error: (error) => {
//         this.saveError = error.error?.Message || 'An error occurred while saving the profile.';
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
  selector: 'app-complete-profile-service-provider',
  standalone: false,
  templateUrl: './complete-profile-service-provider.component.html',
  styleUrls: ['./complete-profile-service-provider.component.css']
})
export class CompleteProfileServiceProviderComponent implements OnInit {
  ServiceProviderForm: FormGroup;
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  hours: string[] = [];
  saveError: string | null = null;
  userId: string | null = null;
  userName: string | null = null;
  role: string | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  currentStep: string = 'location';
  selectedAreas: string[] = ['Brooklyn', 'Manhattan', 'Staten Island'];
  selectedCategories: string[] = ['Roofing', 'Interior design', 'Flooring'];
  formData: FormData = new FormData();

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {
    // Initialize hours array
    this.hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    // Initialize the form group
    this.ServiceProviderForm = this.fb.group({
      country: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', Validators.required],
      addressLine: ['', Validators.required],
      serviceAreas: ['', Validators.required],
      categories: ['', Validators.required],
      services: this.fb.array([
        this.fb.group({ name: ['3D rendering'], enabled: [true] }),
        this.fb.group({ name: ['Deck Building'], enabled: [false] }),
        this.fb.group({ name: ['Architectural Design'], enabled: [true] })
      ]),
      image: [null, Validators.required],
      about: ['', [Validators.required, Validators.minLength(50)]],
      website: ['', [Validators.pattern('https?://.+')]],
      price: ['', [Validators.required, Validators.min(1)]],
      priceUnit: ['per_hour', Validators.required],
      schedules: this.fb.array(this.daysOfWeek.map(() => this.createScheduleGroup())),
      projectName: ['', Validators.required],
      projectDescription: ['', Validators.required],
      projectPrice: ['', [Validators.required, Validators.min(1)]],
      projectPriceUnit: ['per_hour', Validators.required],
      projectMedia: [null, Validators.required],
      projectVideoLink: ['', Validators.pattern('https?://.+')]
    });
  }

  ngOnInit(): void {
    this.role = this.cookieService.get('Role');
    this.userId = this.cookieService.get('Token');

    // Uncomment this if you want to enforce role-based navigation
    /*
    if (!this.userId || !this.userName || this.role !== 'ServiceProvider') {
      this.router.navigate(['/unauthorized']);
      return;
    }
    */

    this.checkProfileCompleteness();

    // Subscribe to schedules value changes to update disabled state
    this.ServiceProviderForm.get('schedules')?.valueChanges.subscribe(() => {
      this.updateScheduleDisabledStates();
    });
  }

  createScheduleGroup(): FormGroup {
    return this.fb.group({
      enabled: [true],
      availableFrom: [{ value: '09:00', disabled: false }, Validators.required],
      availableTo: [{ value: '17:00', disabled: false }, Validators.required]
    });
  }

  get schedules(): FormArray {
    return this.ServiceProviderForm.get('schedules') as FormArray;
  }

  get services(): FormArray {
    return this.ServiceProviderForm.get('services') as FormArray;
  }

  updateScheduleDisabledStates(): void {
    const schedules = this.ServiceProviderForm.get('schedules') as FormArray;
    schedules.controls.forEach((schedule) => {
      const group = schedule as FormGroup;
      const enabled = group.get('enabled')?.value;
      if (enabled) {
        group.get('availableFrom')?.enable();
        group.get('availableTo')?.enable();
      } else {
        group.get('availableFrom')?.disable();
        group.get('availableTo')?.disable();
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.ServiceProviderForm.patchValue({ image: file });
      this.formData.append('image', file);
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onProjectMediaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.formData.append('projectMedia', file);
      this.ServiceProviderForm.patchValue({ projectMedia: file });
    }
  }

  removeArea(area: string): void {
    this.selectedAreas = this.selectedAreas.filter(a => a !== area);
    this.ServiceProviderForm.patchValue({ serviceAreas: this.selectedAreas.join(', ') });
  }

  removeCategory(category: string): void {
    this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    this.ServiceProviderForm.patchValue({ categories: this.selectedCategories.join(', ') });
  }

  goToNextStep(step: string): void {
    this.currentStep = step;
  }

  checkProfileCompleteness(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('Token')}`
    });

    this.http.get(`http://localhost:5070/api/Serviceprovider/check-profile/${this.userId}`, { headers, responseType: 'text' }).subscribe({
      next: (response: string) => {
        try {
          const data = JSON.parse(response);
          if (data.Success && data.Data) {
            this.router.navigate(['/account']);
          } else {
            this.loadSchedules();
          }
        } catch (e) {
          console.error('Error parsing response as JSON:', e);
          this.saveError = 'Invalid response from server.';
        }
      },
      error: (error) => {
        console.error('Error checking profile completeness:', error);
        this.saveError = 'Failed to check profile completeness.';
      }
    });
  }

  loadSchedules(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('Token')}`
    });

    this.http.get('http://localhost:5070/api/serviceproviderschedule/provider', {
      headers,
      params: { pageSize: '5', pageNumber: '1' },
      responseType: 'text'
    }).subscribe({
      next: (response: string) => {
        try {
          const data = JSON.parse(response);
          if (data.Success && data.Data) {
            const schedulesArray = this.ServiceProviderForm.get('schedules') as FormArray;
            schedulesArray.clear();
            this.daysOfWeek.forEach((day, index) => {
              const schedule = data.Data.find((s: any) => s.WorKDay === index);
              schedulesArray.push(this.fb.group({
                enabled: [schedule ? true : false],
                availableFrom: [schedule ? schedule.AvailableFrom : '09:00', Validators.required],
                availableTo: [schedule ? schedule.AvailableTo : '17:00', Validators.required]
              }));
            });
            this.updateScheduleDisabledStates();
          }
        } catch (e) {
          console.error('Error parsing schedules response as JSON:', e);
          this.saveError = 'Failed to load schedules.';
        }
      },
      error: (error) => {
        console.error('Error loading schedules:', error);
        this.saveError = 'Failed to load schedules.';
      }
    });
  }

  onSubmit(): void {
    if (this.ServiceProviderForm.invalid || !this.userId || !this.userName) {
      this.ServiceProviderForm.markAllAsTouched();
      return;
    }

    const token = this.cookieService.get('Token');
    this.formData.append('UserName', this.userName);
    this.formData.append('About', this.ServiceProviderForm.get('about')?.value);
    this.formData.append('Website', this.ServiceProviderForm.get('website')?.value);
    this.formData.append('Price', this.ServiceProviderForm.get('price')?.value);
    this.formData.append('PriceUnit', this.ServiceProviderForm.get('priceUnit')?.value);
    this.formData.append('City', this.ServiceProviderForm.get('city')?.value);
    this.formData.append('Address', this.ServiceProviderForm.get('addressLine')?.value);
    this.formData.append('CategoryServicesId', this.ServiceProviderForm.get('categories')?.value);

    const scheduleData = this.schedules.value
      .map((schedule: any, index: number) => ({
        WorKDay: index,
        AvailableFrom: schedule.enabled ? schedule.availableFrom : null,
        AvailableTo: schedule.enabled ? schedule.availableTo : null
      }))
      .filter((s: any) => s.AvailableFrom && s.AvailableTo);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:5070/api/Serviceprovider/create', this.formData, { headers }).subscribe({
      next: (response: any) => {
        if (response.Success) {
          this.updateSchedules(scheduleData);
        } else {
          this.saveError = response.Message || 'Failed to save profile.';
        }
      },
      error: (error) => {
        this.saveError = error.error?.Message || 'An error occurred while saving the profile.';
      }
    });
  }

  updateSchedules(scheduleData: any[]): void {
    const token = this.cookieService.get('Token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const formData = new FormData();
    formData.append('Schedules', JSON.stringify(scheduleData));

    this.http.put('http://localhost:5070/api/serviceproviderschedule/update', formData, { headers }).subscribe({
      next: (response: any) => {
        if (response.Success) {
          this.router.navigate(['/account']);
        } else {
          this.saveError = response.Message || 'Failed to save schedule.';
        }
      },
      error: (error) => {
        this.saveError = error.error?.Message || 'An error occurred while saving the schedule.';
      }
    });
  }
}