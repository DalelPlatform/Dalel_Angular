import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Schedule } from '../Models/schedule.model';
import { ServiceProviderService } from '../Services/provider.service';
@Component({
  selector: 'app-edit-schedule',
  standalone: false,
  templateUrl: './edit-schedule.component.html',
styleUrls: ['./edit-schedule.component.css'] 
})
export class EditScheduleComponent  implements OnInit {
  scheduleForm: FormGroup;
  isLoading = false;
  successMessage = '';
  errorMessage = '';

  dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private provider: ServiceProviderService
  ) {
    this.scheduleForm = this.createForm();
  }

  ngOnInit(): void {
    // Form is already initialized in constructor
    this.loadExistingSchedule();
  }

  loadExistingSchedule(): void {
    // This method can be used to load existing schedule data
    // For demonstration, we'll set some default values
    // In real implementation, you would load from API
    
    // Example: Enable Monday to Friday with default hours
    const defaultDays = [1, 2, 3, 4, 5]; // Monday to Friday
    defaultDays.forEach(dayIndex => {
      const schedule = this.scheduleItems.at(dayIndex);
      schedule.get('isEnabled')?.setValue(true);
      schedule.get('availableFrom')?.setValue('09:00');
      schedule.get('availableTo')?.setValue('17:00');
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      serviceProviderId: ['', [Validators.required, Validators.minLength(1)]],
      schedules: this.fb.array(this.createScheduleFormArray())
    });
  }

  createScheduleFormArray(): FormGroup[] {
    return this.dayNames.map((_, index) => 
      this.fb.group({
        workDay: [index, [Validators.required]],
        availableFrom: ['', this.createTimeValidators()],
        availableTo: ['', this.createTimeValidators()],
        isEnabled: [false]
      }, { validators: this.timeRangeValidator })
    );
  }

  createTimeValidators() {
    return (control: any) => {
      const schedule = control.parent;
      if (schedule && schedule.get('isEnabled')?.value) {
        return Validators.required(control);
      }
      return null;
    };
  }

  timeRangeValidator(group: any) {
    const isEnabled = group.get('isEnabled')?.value;
    const from = group.get('availableFrom')?.value;
    const to = group.get('availableTo')?.value;
    
    if (isEnabled && from && to) {
      const fromTime = new Date(`2000-01-01T${from}:00`);
      const toTime = new Date(`2000-01-01T${to}:00`);
      
      if (fromTime >= toTime) {
        return { timeRange: true };
      }
    }
    
    return null;
  }

  initializeSchedule(): void {
    // Form is already initialized in createForm()
    // This method is kept for backward compatibility
  }

  get scheduleItems(): FormArray {
    return this.scheduleForm.get('schedules') as FormArray;
  }

  getDayName(dayIndex: number): string {
    return this.dayNames[dayIndex] || '';
  }

  isDayEnabled(index: number): boolean {
    const schedule = this.scheduleItems.at(index);
    return schedule.get('isEnabled')?.value || false;
  }

  toggleDay(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    const schedule = this.scheduleItems.at(index);
    
    schedule.get('isEnabled')?.setValue(target.checked);
    
    if (target.checked) {
      // Enable the day with default times
      schedule.get('availableFrom')?.setValue('09:00');
      schedule.get('availableTo')?.setValue('17:00');
    } else {
      // Disable the day
      schedule.get('availableFrom')?.setValue('');
      schedule.get('availableTo')?.setValue('');
    }
    
    // Update validation status
    schedule.get('availableFrom')?.updateValueAndValidity();
    schedule.get('availableTo')?.updateValueAndValidity();
    schedule.updateValueAndValidity();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.scheduleForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  isScheduleFieldInvalid(index: number, fieldName: string): boolean {
    const schedule = this.scheduleItems.at(index);
    const field = schedule.get(fieldName);
    const isEnabled = schedule.get('isEnabled')?.value;
    return !!(field && field.invalid && (field.dirty || field.touched) && isEnabled);
  }

  hasScheduleError(index: number): boolean {
    const schedule = this.scheduleItems.at(index);
    return !!(schedule.invalid && (schedule.dirty || schedule.touched) && schedule.get('isEnabled')?.value);
  }

  resetForm(): void {
    this.scheduleForm.reset();
    // Reset to initial state
    this.scheduleItems.controls.forEach((control, index) => {
      control.get('workDay')?.setValue(index);
      control.get('isEnabled')?.setValue(false);
    });
    this.successMessage = '';
    this.errorMessage = '';
  }

  onSubmit(): void {
    // if (this.scheduleForm.invalid) {
    //   this.markFormGroupTouched(this.scheduleForm);
    //   return;
    // }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formValue = this.scheduleForm.value;
    
    // Filter out disabled days and format the data
    const enabledSchedules = formValue.schedules
      .filter((schedule: any) => schedule.isEnabled && schedule.availableFrom && schedule.availableTo)
      .map((schedule: any) => ({
        WorkDay: schedule.workDay,
        AvailableFrom: schedule.availableFrom,
        AvailableTo: schedule.availableTo
      }));

    const scheduleData: Schedule = {
      ServiceProviderId: formValue.serviceProviderId,
      Schedules: enabledSchedules
    };

    this.provider.updateSchedule(scheduleData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.successMessage = 'Schedule updated successfully!';
        setTimeout(() => this.successMessage = '', 5000);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to update schedule. Please try again.';
        console.error('Schedule update error:', error);
      }
    });
  }

  

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach(arrayControl => {
          if (arrayControl instanceof FormGroup) {
            this.markFormGroupTouched(arrayControl);
          }
        });
      }
    });
  }
}