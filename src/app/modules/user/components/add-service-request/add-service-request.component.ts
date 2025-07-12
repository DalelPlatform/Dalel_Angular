import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ServiceRequestService } from '../../services/service-request.service';

@Component({
  selector: 'app-add-service-request',
  standalone: false,
  templateUrl: './add-service-request.component.html',
  styleUrls: ['./add-service-request.component.css'],
})
export class AddServiceRequestComponent implements OnInit {
  requestForm!: FormGroup;
  isLoading = false;
  categories: any[] = [];

  imageTouched = false;
  imageValid = false;
  selectedImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private serviceRequestService: ServiceRequestService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
  }

  initForm(): void {
    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      CategoryServicesId: ['', Validators.required],
      dueDate: ['', [Validators.required, this.dateNotInPastValidator]],
      startPrice: ['', [Validators.required, Validators.min(0.01)]],
      address: ['', Validators.required],
      image: [null], // not used in HTML but stored manually
    });
  }

  dateNotInPastValidator(control: AbstractControl): ValidationErrors | null {
    const selectedDate = new Date(control.value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate < today ? { dateInPast: true } : null;
  }

  loadCategories(): void {
    this.serviceRequestService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.Data;
        console.log('Categories loaded:', response.Data);
      },
      error: () => {
        this.toastr.error('Failed to load categories');
      },
    });
  }

  onFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    this.imageTouched = true;

    if (file && file.type.startsWith('image/')) {
      this.imageValid = true;
      this.selectedImageFile = file;
      this.requestForm.patchValue({ image: file }); // just to hold value
    } else {
      this.imageValid = false;
      this.selectedImageFile = null;
      this.requestForm.patchValue({ image: null });
    }
  }

  onSubmit(): void {
    if (this.requestForm.invalid || !this.imageValid) {
      this.requestForm.markAllAsTouched();
      this.imageTouched = true;
      return;
    }

    this.isLoading = true;
    const formData = new FormData();

    formData.append('title', this.requestForm.get('title')?.value);
    formData.append('description', this.requestForm.get('description')?.value);
    formData.append('categoryServicesId', this.requestForm.get('CategoryServicesId')?.value);
    formData.append('dueDate', this.requestForm.get('dueDate')?.value);
    formData.append('startPrice', this.requestForm.get('startPrice')?.value);
    formData.append('address', this.requestForm.get('address')?.value);

    if (this.selectedImageFile) {
      formData.append('image', this.selectedImageFile);
    }

    this.serviceRequestService.createServiceRequest(formData).subscribe({
      next: (res) => {
        console.log('✅ Response:', res);
        this.toastr.success(res?.message || 'Service request created successfully');
        this.router.navigate(['/service-requests']);
      },
      error: (err) => {
        console.error('Error creating service request:', err);
        this.toastr.error(err.error?.message || 'Failed to create service request');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
