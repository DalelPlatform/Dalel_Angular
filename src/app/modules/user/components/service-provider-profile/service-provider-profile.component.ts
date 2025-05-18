import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProviderProfileService } from './service-provider-profile.service';
import { Router } from '@angular/router';
import { scheduleValidator } from './validators/schedule.validator';

@Component({
  selector: 'app-service-provider-profile',
  standalone: false,
  templateUrl: './service-provider-profile.component.html',
  styleUrls: ['./service-provider-profile.component.css']
})
export class ServiceProviderProfileComponent implements OnInit {
  profileForm: FormGroup;
  scheduleForm: FormGroup;
  errorMessage: string = '';
  daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  hours: string[] = [];
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = 'assets/placeholder.jpg';

  constructor(
    private fb: FormBuilder,
    private profileService: ServiceProviderProfileService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      image: [null, Validators.required],
      about: ['', [Validators.required, Validators.minLength(50)]],
      website: ['', Validators.pattern(/https?:\/\/.+/)]
    });

    this.scheduleForm = this.fb.group({
      price: ['', [Validators.required, Validators.min(1)]],
      priceUnit: ['per_hour', Validators.required],
      schedules: this.fb.array([], scheduleValidator())
    });

    // Initialize hours (8:00 AM to 8:00 PM)
    for (let i = 8; i <= 20; i++) {
      this.hours.push(`${i}:00`);
    }
  }

  ngOnInit(): void {
    this.initializeSchedules();
    this.checkProfileCompletion();
  }

  get schedules(): FormArray {
    return this.scheduleForm.get('schedules') as FormArray;
  }

  initializeSchedules(): void {
    this.daysOfWeek.forEach(day => {
      this.schedules.push(this.fb.group({
        day: [day],
        enabled: [false],
        availableFrom: ['9:00'],
        availableTo: ['17:00']
      }));
    });
  }

  checkProfileCompletion(): void {
    this.profileService.checkProfileCompletion().subscribe({
      next: (isComplete) => {
        if (isComplete) {
          this.router.navigate(['/account']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to check profile status. Please try again.';
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.profileForm.patchValue({ image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.profileForm.invalid || this.scheduleForm.invalid) {
      this.markAllAsTouched();
      this.errorMessage = 'Please fill all required fields correctly.';
      return;
    }

    const formData = new FormData();
    formData.append('image', this.profileForm.get('image')?.value);
    formData.append('about', this.profileForm.get('about')?.value);
    formData.append('website', this.profileForm.get('website')?.value || '');
    formData.append('price', this.scheduleForm.get('price')?.value);
    formData.append('priceUnit', this.scheduleForm.get('priceUnit')?.value);
    
    const schedules = this.scheduleForm.get('schedules')?.value;
    formData.append('schedules', JSON.stringify(schedules));

    this.profileService.saveProfile(formData).subscribe({
      next: () => {
        this.router.navigate(['/account']);
      },
      error: (err) => {
        this.errorMessage = 'Failed to save profile. Please try again.';
      }
    });
  }

  private markAllAsTouched(): void {
    Object.values(this.profileForm.controls).forEach(control => {
      control.markAsTouched();
    });
    Object.values(this.scheduleForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
