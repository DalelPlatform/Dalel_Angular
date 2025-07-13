import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { PropertyOwnerService } from '../../../../../../Services/Property/property-owner.service';
import { UserProfile } from '../../../../../serviceprovider/Models/user-profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: false
})
export class SettingsComponent implements OnInit {
  cookies = inject(CookieService);
  fb = inject(FormBuilder);
  propertyService = inject(PropertyOwnerService);

  profileForm: FormGroup;
  userProfile: UserProfile | null = null;
  isLoading = true;
  isUpdating = false;
  imagePreview: string = '';
  selectedImageFile: File | null = null;

  constructor() {
    this.profileForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Email: ['', [Validators.required, Validators.email]],
      UserName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]],
      ProfileImg: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = this.cookies.get('Token');
    this.propertyService.getProfile(token).subscribe({
      next: (response) => {
        console.log(response);
        if (response.Success) {
          this.userProfile = response.Data;
          this.imagePreview = this.userProfile?.ProfileImg || '';
          this.populateForm();
        } else {
          console.error('Failed to load profile:', response.Message);
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile:', error);
        this.isLoading = false;
      }
    });
  }

  populateForm(): void {
    if (this.userProfile) {
      this.profileForm.patchValue({
        FirstName: this.userProfile.FirstName,
        LastName: this.userProfile.LastName,
        Email: this.userProfile.Email,
        UserName: this.userProfile.UserName,
        PhoneNumber: this.userProfile.PhoneNumber
      });
    }
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.isUpdating = true;
      const token = this.cookies.get('Token');
      
      const formData = new FormData();
      const formValue = this.profileForm.value;
      
      // Append form values
      Object.keys(formValue).forEach(key => {
        if (key !== 'ProfileImg') {
          formData.append(key, formValue[key]);
        }
      });

      // Append image if selected
      if (this.selectedImageFile) {
        formData.append('ProfileImg', this.selectedImageFile);
      }

      this.propertyService.updateProfile(formData, token).subscribe({
        next: (response) => {
          if (response.Success) {
            alert('Profile updated successfully!');
            this.loadUserProfile(); // Reload profile data
          } else {
            alert('Failed to update profile: ' + response.Message);
          }
          this.isUpdating = false;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
          this.isUpdating = false;
        }
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.profileForm.controls).forEach(key => {
        this.profileForm.get(key)?.markAsTouched();
      });
    }
  }

  get formControls() {
    return this.profileForm.controls;
  }
}
