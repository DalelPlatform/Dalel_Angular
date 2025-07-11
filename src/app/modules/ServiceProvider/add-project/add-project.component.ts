// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ServiceProviderProjectService } from '../Services/serviceproviderprojects.service';
// import { ServiceProviderService } from '../Services/provider.service';
// import { ToastrService } from 'ngx-toastr';import { ServiceProvider } from '../Models/serviceprovider.model';
// @Component({
//   selector: 'app-add-project',
//   standalone: false,
//   templateUrl: './add-project.component.html',
//   styleUrl: './add-project.component.css'
// })
// export class AddProjectComponent {
// projectForm!: FormGroup;
//   selectedImageFile: File | null = null;
//   imagePreview: string = '';
//   ProviderProfile!: ServiceProvider;
//   prviderID!: string;
//    constructor(
//     private fb: FormBuilder,
//     private projectService: ServiceProviderProjectService,
//     private service: ServiceProviderService,
//     private toastr: ToastrService
//   ) {
//     this.projectForm = this.fb.group({
//       Name: ['', Validators.required],
//       Description: ['', Validators.required],
//       ApproximatePrice: [null, Validators.required],
//       PriceUnit: ['per_hour', Validators.required],
//       Image: [null, Validators.required]
//     });
//   }

//   loadProviderProfile(): void {
//     this.service.getOwnProfile().subscribe({
//       next: (res) => {
//         if (!res.Success) {
//           this.toastr.error(res.Message || 'Failed to load profile');
//           return;
//         }
//         this.ProviderProfile = res.Data;
//         this.prviderID = this.ProviderProfile.UserId;
//         this.imagePreview = this.ProviderProfile.Image || '';
//         console.log(this.ProviderProfile);
//       },
//       error: err => console.error('Profile load failed', err)
//     });
//   }
// onImageSelected(event: any) {
//   const file = event.target.files[0];
//   if (file) {
//     this.selectedImageFile = file;

//     this.projectForm.patchValue({ Image: file });
//     this.projectForm.get('Image')?.updateValueAndValidity();
//     const reader = new FileReader();
//     reader.onload = () => (this.imagePreview = reader.result as string);
//     reader.readAsDataURL(file);
//   }
// }

//    onSubmit() {
//     if (this.projectForm.invalid || !this.selectedImageFile) {
//       this.toastr.error('Please complete all required fields.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('ServiceProviderId', this.prviderID);
//     formData.append('Name', this.projectForm.value.Name);
//     formData.append('Description', this.projectForm.value.Description);
//     formData.append('ApproximatePrice', this.projectForm.value.ApproximatePrice);
//     formData.append('PriceUnit', this.projectForm.value.PriceUnit);
//     formData.append('Image', this.selectedImageFile);

//     this.projectService.createProject(formData).subscribe({
//       next: (res) => {
//         if (res.Success) {
//           this.toastr.success('Project created successfully!');
//           this.projectForm.reset();
//           this.imagePreview = '';
//         } else {
//           this.toastr.error(res.Message);
//         }
//       },
//       error: (err) => {
//         this.toastr.error('Failed to create project');
//         console.log(err.error.errors);
                
//       }
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProviderProjectService } from '../Services/serviceproviderprojects.service';
import { ServiceProviderService } from '../Services/provider.service';
import { ToastrService } from 'ngx-toastr';
import { ServiceProvider } from '../Models/serviceprovider.model';

@Component({
  selector: 'app-add-project',
  standalone: false,
  templateUrl: './add-project.component.html',
  styleUrl: './add-project.component.css'
})
export class AddProjectComponent implements OnInit {
  projectForm!: FormGroup;
  selectedImageFile: File | null = null;
  imagePreview: string = '';
  ProviderProfile!: ServiceProvider;
  prviderID!: string;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private projectService: ServiceProviderProjectService,
    private service: ServiceProviderService,
    private toastr: ToastrService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadProviderProfile();
  }

  private initializeForm(): void {
    this.projectForm = this.fb.group({
      Name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      Description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      ApproximatePrice: [null, [Validators.required, Validators.min(1)]],
      PriceUnit: ['per_hour', Validators.required],
      Image: [null, Validators.required]
    });
  }

  loadProviderProfile(): void {
    this.isLoading = true;
    this.service.getOwnProfile().subscribe({
      next: (res) => {
        this.isLoading = false;
        if (!res.Success) {
          this.toastr.error(res.Message || 'Failed to load profile');
          return;
        }
        this.ProviderProfile = res.Data;
        this.prviderID = this.ProviderProfile.UserId;
        console.log(this.ProviderProfile);
      },
      error: err => {
        this.isLoading = false;
        console.error('Profile load failed', err);
        this.toastr.error('Failed to load provider profile');
      }
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        this.toastr.error('Please select a valid image file (JPEG, PNG, JPG, WebP)');
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        this.toastr.error('Image size should not exceed 5MB');
        return;
      }

      this.selectedImageFile = file;
      this.projectForm.patchValue({ Image: file });
      this.projectForm.get('Image')?.updateValueAndValidity();
      
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImageFile = null;
    this.imagePreview = '';
    this.projectForm.patchValue({ Image: null });
    this.projectForm.get('Image')?.updateValueAndValidity();
    
    // Reset file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid || !this.selectedImageFile) {
      this.markFormGroupTouched();
      this.toastr.error('Please complete all required fields correctly.');
      return;
    }

    this.isSubmitting = true;
    const formData = new FormData();
    formData.append('ServiceProviderId', this.prviderID);
    formData.append('Name', this.projectForm.value.Name);
    formData.append('Description', this.projectForm.value.Description);
    formData.append('ApproximatePrice', this.projectForm.value.ApproximatePrice);
    formData.append('PriceUnit', this.projectForm.value.PriceUnit);
    formData.append('Image', this.selectedImageFile);

    this.projectService.createProject(formData).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        if (res.Success) {
          this.toastr.success('Project created successfully!');
          this.resetForm();
        } else {
          this.toastr.error(res.Message || 'Failed to create project');
        }
      },
      error: (err) => {
        this.isSubmitting = false;
        this.toastr.error('Failed to create project');
        console.log(err.error?.errors || err);
      }
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.projectForm.controls).forEach(key => {
      this.projectForm.get(key)?.markAsTouched();
    });
  }

  private resetForm(): void {
    this.projectForm.reset();
    this.projectForm.patchValue({ PriceUnit: 'per_hour' });
    this.imagePreview = '';
    this.selectedImageFile = null;
    
    // Reset file input
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Helper methods for template
  isFieldInvalid(fieldName: string): boolean {
    const field = this.projectForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.projectForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['minlength']) return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['maxlength']) return `${fieldName} cannot exceed ${field.errors['maxlength'].requiredLength} characters`;
      if (field.errors['min']) return `${fieldName} must be greater than 0`;
    }
    return '';
  }
}