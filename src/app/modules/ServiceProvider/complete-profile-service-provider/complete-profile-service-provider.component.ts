import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';
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
  profileForm!: FormGroup;
  currentStep: number = 1;
  steps: number[] = [1, 2, 3, 4];
  saveError: string | null = null;
  categoriesList: string[] = [];
  userId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private cdRef: ChangeDetectorRef 
  ) {
    this.initForm();
  }

ngOnInit(): void {
    this.checkProfileCompleteness();
    this.loadCategories();
    this.fetchUserId();
  }
  fetchUserId(): void {
    const token = this.cookieService.get('Token');
    if (!token) {
      this.saveError = 'No token found. Please log in again.';
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // طلب GET للـ endpoint اللي عندك
    this.http.get<{ Success: boolean, Data: any, Message: string }>('http://localhost:5070/api/ServiceProvider/profile', { headers }).subscribe({
      next: (response) => {
        if (response.Success && response.Data) {
          this.userId = response.Data.userId; 
          console.log('UserId fetched:', this.userId);
        } else {
          this.saveError = response.Message || 'Failed to fetch user ID.';
        }
      },
      error: (error) => {
        console.error('Error fetching user ID:', error);
        this.saveError = 'Failed to fetch user ID.';
      }
    });
  }

  loadCategories(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('Token')}`
    });

    // Expecting an object with Success, Data, and Message
    this.http.get<{ Success: boolean, Data: string[], Message: string }>('http://localhost:5070/api/CategoryServices/categories', { headers }).subscribe({
      next: (response) => {
        if (response.Success) {
          this.categoriesList = response.Data;
          this.cdRef.detectChanges();
        } else {
          this.saveError = response.Message || 'Failed to load categories.';
        }
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.saveError = 'Failed to load categories.';
      }
    });
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
    this.profileForm = this.fb.group({
      // Step 1: Business Location
      country: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', Validators.required],
      addressLine: ['', Validators.required],
      serviceAreas: ['', Validators.required],

      // Step 2: Choose Services (only categories now)
      categories: ['', Validators.required], // Dropdown field

      // Step 3: Profile Details
      image: [null, Validators.required],
      about: ['', [Validators.required, Validators.minLength(50)]],
      website: ['', [Validators.pattern('https?://.+')]],

      // Step 4: Price and Hours
      price: ['', [Validators.required, Validators.min(1)]],
      priceUnit: ['per_hour', Validators.required],
      schedules: this.fb.array(this.getInitialSchedules())
    });
  }

  get schedules(): FormArray {
    return this.profileForm.get('schedules') as FormArray;
  }

  getInitialSchedules(): FormGroup[] {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days.map(() => this.fb.group({
      enabled: [true],
      availableFrom: ['09:00', Validators.required],
      availableTo: ['17:00', Validators.required]
    }));
  }

  getHours(): string[] {
    return Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  }

  onFileChange(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.profileForm.patchValue({ [field]: file });
    }
  }

  checkProfileCompleteness(): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cookieService.get('Token')}`
    });
    this.http.get(`http://localhost:5070/api/Serviceprovider/check-profile`, { headers, responseType: 'text' }).subscribe({
      next: (response: string) => {
        try {
          const data = JSON.parse(response);
          if (data.Success && data.Data) {
            this.router.navigate(['/account']);
          }
        } catch (e) {
          this.saveError = 'Invalid response from server.';
        }
      },
      error: (error) => {
        this.saveError = 'Failed to check profile completeness.';
      }
    });
  }

  onSubmit(): void {
    const token = this.cookieService.get('Token');
    if (!token) {
      this.saveError = 'No token found. Please log in again.';
      return;
    }
    if (!this.userId) {
      this.saveError = 'UserId not fetched yet. Please wait or try again.';
      return;
    }    
    const formData = new FormData();
    // formData.append('UserId', this.userId); 
    formData.append('City', this.profileForm.get('city')?.value);
    formData.append('District', this.profileForm.get('district')?.value);
    formData.append('ZipCode', this.profileForm.get('zipCode')?.value);
    formData.append('Address', this.profileForm.get('addressLine')?.value);
    formData.append('ServiceArea', this.profileForm.get('serviceAreas')?.value);
    formData.append('CategoryServicesId', this.profileForm.get('categories')?.value);
    formData.append('Image', this.profileForm.get('image')?.value);
    formData.append('About', this.profileForm.get('about')?.value);
    formData.append('Website', this.profileForm.get('website')?.value);
    formData.append('Price', this.profileForm.get('price')?.value);
    formData.append('PriceUnit', this.profileForm.get('priceUnit')?.value);
        console.log('FormData:', formData); 

const scheduleData = this.schedules.value
  .map((schedule: any, index: number) => ({
    WorkDay: index,
    AvailableFrom: schedule.enabled ? schedule.availableFrom : null,
    AvailableTo: schedule.enabled ? schedule.availableTo : null
  }))
  .filter((s: any) => s.AvailableFrom && s.AvailableTo);

scheduleData.forEach((s:any, i: number) => {
  formData.append(`Schedules[${i}].WorkDay`, s.WorkDay.toString());
  formData.append(`Schedules[${i}].AvailableFrom`, s.AvailableFrom);
  formData.append(`Schedules[${i}].AvailableTo`, s.AvailableTo);
});

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.put('http://localhost:5070/api/Serviceprovider/create', formData, { headers }).subscribe({
      next: (response: any) => {
        if (response.Success) {
          alert('Profile saved successfully!');
          this.router.navigate(['/account']);
        } else {
          this.saveError = response.Message || 'Failed to save profile.';
        }
      },
      error: (error) => {
        this.saveError = error.error?.Message || 'An error occurred while saving the profile.';
      }
    });
  }
}