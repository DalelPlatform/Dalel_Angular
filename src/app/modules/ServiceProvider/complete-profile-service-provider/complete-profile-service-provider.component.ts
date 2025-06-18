import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { CompleteProfileServiceProviderService } from '../Services/CompleteProfileServiceProvider.Service';
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
  previewUrl: string | ArrayBuffer | null = null;
  currentStep: string = 'location';
  selectedAreas: string[] = ['Brooklyn', 'Manhattan', 'Staten Island'];
  selectedCategories: string[] = ['Roofing', 'Interior design', 'Flooring'];
  formData: FormData = new FormData();
  saveError: string | null = null;
  errorMessage: string | null = null;
  userId: string | null = null;
  userName: string | null = null;
  role: string | null = null;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private service: CompleteProfileServiceProviderService,
    private cookieService: CookieService
  ) {
    this.hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
    this.ServiceProviderForm = this.fb.group({
      country: ['Egypt', Validators.required],
      city: ['Aswan', Validators.required],
      district: ['Aswan', Validators.required],
      zipCode: ['22222', Validators.required],
      addressLine: ['Asawan', Validators.required],
      serviceAreas: ['rererererer', Validators.required],
      categories: ['', Validators.required],
      image: [null, Validators.required],
      about: ['ttttttttttttttrttttttttttttttttttttttttttttttttttttt', [Validators.required, Validators.minLength(50)]],
      website: ['http://hdgsfhdgfsgd', [Validators.pattern('https?://.+')]],
      price: ['222', [Validators.required, Validators.min(1)]],
      priceUnit: ['per_hour', Validators.required],
      schedules: this.fb.array(this.daysOfWeek.map(() => this.createScheduleGroup())),
      projectName: ['test', Validators.required],
      projectDescription: ['ttttttttttttttttttttttttttttt', Validators.required],
      projectPrice: ['333', [Validators.required, Validators.min(1)]],
      projectPriceUnit: ['per_hour', Validators.required],
      projectMedia: [null, Validators.required],
      projectVideoLink: ['https://ererere', Validators.pattern('https?://.+')]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.role = this.cookieService.get('Role');
    this.userId = this.cookieService.get('Token');
  }
  loadCategories(): void {
    this.service.getCategories().subscribe({
      next: (response) => {
        this.categories = response.Data;
        console.log('Categories loaded:', response.Data);
      },
      error: (err) => {
        this.toastr.error('Failed to load categories');
      }
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

  updateScheduleDisabledStates(): void {
    this.schedules.controls.forEach((group) => {
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
    this.errorMessage = null;

    if (!input || !input.files || input.files.length === 0) return;

    const file = input.files[0];

    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      this.errorMessage = 'Please upload a valid image file (PNG or JPEG).';
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage = 'File size exceeds 2MB limit.';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (img.width > 1000 || img.height > 1000) {
          this.errorMessage = 'Image dimensions exceed 1000px limit.';
          return;
        }
        this.previewUrl = reader.result;
        this.ServiceProviderForm.patchValue({ image: file });
        this.formData.append('image', file);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
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

  loadSchedules(): void {
    this.service.loadSchedules().subscribe({
      next: (response: string) => {
        try {
          const data = JSON.parse(response);
          if (data.Success && data.Data) {
            this.schedules.clear();
            this.daysOfWeek.forEach((_, index) => {
              const schedule = data.Data.find((s: any) => s.WorKDay === index);
              this.schedules.push(this.fb.group({
                enabled: [!!schedule],
                availableFrom: [schedule ? schedule.AvailableFrom : '09:00', Validators.required],
                availableTo: [schedule ? schedule.AvailableTo : '17:00', Validators.required]
              }));
            });
            this.updateScheduleDisabledStates();
          }
        } catch {
          this.saveError = 'Failed to load schedules.';
        }
      },
      error: () => this.saveError = 'Failed to load schedules.'
    });
  }

  onSubmit(): void {
    if (this.ServiceProviderForm.invalid || !this.userId) {
      this.ServiceProviderForm.markAllAsTouched();
      console.log('Form is invalid or user data is missing', this.ServiceProviderForm.value, this.userId);

      return;
    }
    this.formData.append('UserId', 'UserId');
    this.formData.append('UserName', "UserName");
    this.formData.append('ServiceArea', this.ServiceProviderForm.get('serviceAreas')?.value);
    this.formData.append('ZipCode', this.ServiceProviderForm.get('zipCode')?.value);
    this.formData.append('District', this.ServiceProviderForm.get('district')?.value);
    this.formData.append('Country', this.ServiceProviderForm.get('country')?.value);
    this.formData.append('About', this.ServiceProviderForm.get('about')?.value);
    this.formData.append('Website', this.ServiceProviderForm.get('website')?.value);
    this.formData.append('Price', this.ServiceProviderForm.get('price')?.value);
    this.formData.append('PriceUnit', this.ServiceProviderForm.get('priceUnit')?.value);
    this.formData.append('City', this.ServiceProviderForm.get('city')?.value);
    this.formData.append('Address', this.ServiceProviderForm.get('addressLine')?.value);
    this.formData.append('CategoryServicesId', this.ServiceProviderForm.get('categories')?.value);

    
      let scheduleData =   this.schedules.value
      .map((schedule: any, index: number) => ({
          ServiceProviderId: "",
          WorKDay: index,
          AvailableFrom: schedule.enabled ? schedule.availableFrom : null,
          AvailableTo: schedule.enabled ? schedule.availableTo : null
        
      }))
    .filter((s: any) => s.AvailableFrom && s.AvailableTo);
    console.log(scheduleData);



    this.service.createServiceProvider(this.formData).subscribe({
      next: (res) => {
        console.log('Profile creation response:', res);

        if (res.Success) {
          this.service.AddSchedules( { "Schedules":scheduleData , "ServiceProviderId":""}).subscribe({
            next: (r) => {
              if (r.Success) this.router.navigate(['/account']);
              else this.saveError = r.Message || 'Failed to save schedule.';
            },
            error: (e) => this.saveError = e.error?.Message || 'Error while saving schedule.'
          });
        } else {
          this.saveError = res.Message || 'Failed to save profile.';
        }
      },
      error: (e) => {
        console.log('Profile creation error:', e);

        this.saveError = e.error?.Message || 'Error while saving profile.'
      }
    });
  }
}
