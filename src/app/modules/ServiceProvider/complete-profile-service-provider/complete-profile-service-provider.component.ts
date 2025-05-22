import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-complete-profile-service-provider',
  standalone: false,
  templateUrl: './complete-profile-service-provider.component.html',
  styleUrl: './complete-profile-service-provider.component.css'
})
export class CompleteProfileServiceProviderComponent implements OnInit {
  profileForm: FormGroup;
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
    this.hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    this.profileForm = this.fb.group({
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
    this.userId = this.cookieService.get('UserId');
    this.userName = this.cookieService.get('UserName');

    // if (!this.userId || !this.userName || this.role !== 'ServiceProvider') {
    //   this.router.navigate(['/unauthorized']);
    //   return;
    // }

    this.checkProfileCompleteness();

    // Subscribe to schedules value changes to update disabled state
    this.profileForm.get('schedules')?.valueChanges.subscribe(() => {
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
    return this.profileForm.get('schedules') as FormArray;
  }

  get services(): FormArray {
    return this.profileForm.get('services') as FormArray;
  }

  updateScheduleDisabledStates(): void {
    const schedules = this.profileForm.get('schedules') as FormArray;
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
      this.profileForm.patchValue({ image: file });
      this.formData.append('image',file);
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
      
    }
  }

  removeArea(area: string): void {
    this.selectedAreas = this.selectedAreas.filter(a => a !== area);
    this.profileForm.patchValue({ serviceAreas: this.selectedAreas.join(', ') });
  }

  removeCategory(category: string): void {
    this.selectedCategories = this.selectedCategories.filter(c => c !== category);
    this.profileForm.patchValue({ categories: this.selectedCategories.join(', ') });
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
            // this.getServiceProviderData();
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

    this.http.get(`http://localhost:5070/api/serviceproviderschedule/provider`, { headers, params: { pageSize: '5', pageNumber: '1' }, responseType: 'text' }).subscribe({
      next: (response: string) => {
        try {
          const data = JSON.parse(response);
          if (data.Success && data.Data) {
            const schedulesArray = this.profileForm.get('schedules') as FormArray;
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

  // getServiceProviderData(): void {
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.cookieService.get('Token')}`
  //   });

  //   this.http.post(`http://localhost:5070/api/Serviceprovider/create`, this.formData).subscribe({
  //     next: (data: any) => {
  //       try {
  //         if (data.Success && data.Data) {
  //           const providerData = data.Data;
  //           this.profileForm.patchValue({
  //             country: providerData.Country,
  //             city: providerData.City,
  //             // district: providerData.District,
  //             // zipCode: providerData.ZipCode,
  //             addressLine: providerData.Address,
  //             // serviceAreas: providerData.ServiceAreas,
  //             categories: providerData.CategoryServicesId,
  //             about: providerData.About,
  //             website: providerData.Website,
  //             price: providerData.Price,
  //             priceUnit: providerData.PriceUnit,
  //           //   projectName: providerData.ProjectName,
  //           //   projectDescription: providerData.ProjectDescription,
  //           //   projectPrice: providerData.ProjectPrice,
  //           //   projectPriceUnit: providerData.ProjectPriceUnit,
  //           //   projectVideoLink: providerData.ProjectVideoLink
  //           });

  //           this.selectedAreas = providerData.ServiceAreas ? providerData.ServiceAreas.split(', ') : [];
  //           this.selectedCategories = providerData.Categories ? providerData.Categories.split(', ') : [];

  //           if (providerData.Services) {
  //             const servicesArray = this.profileForm.get('services') as FormArray;
  //             servicesArray.clear();
  //             providerData.Services.forEach((service: any) => {
  //               servicesArray.push(this.fb.group({
  //                 name: [service.name],
  //                 enabled: [service.enabled]
  //               }));
  //             });
  //           }

  //           if (providerData.ImageUrl) {
  //             this.previewUrl = providerData.ImageUrl;
  //           }
  //         }
  //       } catch (e) {
  //         console.error('Error parsing service provider data response as JSON:', e);
  //         this.saveError = 'Failed to fetch service provider data.';
  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error fetching service provider data:', error);
  //       this.saveError = 'Failed to fetch service provider data.';
  //     }
  //   });
  // }

  onSubmit(): void {
    if (this.profileForm.invalid || !this.userId || !this.userName) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const token = this.cookieService.get('Token');
    this.formData.append('Image', this.profileForm.get('Image')?.value);
    this.formData.append('UserName', this.userName);
    this.formData.append('About', this.profileForm.get('about')?.value);
    this.formData.append('Website', this.profileForm.get('website')?.value);
    this.formData.append('Price', this.profileForm.get('price')?.value);
    this.formData.append('PriceUnit', this.profileForm.get('priceUnit')?.value);
    // formData.append('Country', this.profileForm.get('country')?.value);
    this.formData.append('City', this.profileForm.get('city')?.value);
    // formData.append('District', this.profileForm.get('district')?.value);
    // formData.append('ZipCode', this.profileForm.get('zipCode')?.value);
    this.formData.append('Address', this.profileForm.get('addressLine')?.value);
    // formData.append('ServiceAreas', this.profileForm.get('serviceAreas')?.value);
    this.formData.append('CategoryServicesId', this.profileForm.get('categories')?.value);
    // formData.append('Services', JSON.stringify(this.profileForm.get('services')?.value));
    // formData.append('ProjectName', this.profileForm.get('projectName')?.value);
    // formData.append('ProjectDescription', this.profileForm.get('projectDescription')?.value);
    // formData.append('ProjectPrice', this.profileForm.get('projectPrice')?.value);
    // formData.append('ProjectPriceUnit', this.profileForm.get('projectPriceUnit')?.value);
    // formData.append('ProjectMedia', this.profileForm.get('projectMedia')?.value);
    // formData.append('ProjectVideoLink', this.profileForm.get('projectVideoLink')?.value);
    console.log(this.profileForm.status)
    const scheduleData = this.schedules.value
      .map((Schedules: any, index: number) => ({
        WorKDay: index,
        AvailableFrom: Schedules.enabled ? Schedules.availableFrom : null,
        AvailableTo: Schedules.enabled ? Schedules.availableTo : null
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