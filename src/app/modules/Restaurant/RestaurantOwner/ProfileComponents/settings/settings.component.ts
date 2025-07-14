import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../../../user/services/user.service';
import { UserProfile } from '../../../../serviceprovider/Models/user-profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: false
})
export class RestaurantSettingsComponent implements OnInit {
  cookies = inject(CookieService);
  fb = inject(FormBuilder);
  Service = inject(AccountService);

  profileForm: FormGroup;
  userProfile: UserProfile | null = null;
  isLoading = true;
  isUpdating = false;
  imagePreview: string = '';
  selectedImageFile: File | null = null;

  constructor(private toastr: ToastrService) {
    this.profileForm = this.fb.group({
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      LastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      // Email: ['', [Validators.required, Validators.email]],
      // UserName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      PhoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{11}$/)
      ]],
      ProfileImg: ['']
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    const token = this.cookies.get('Token');
    this.Service.getProfile(token).subscribe({
      next: (response) => {
        console.log(response);
        if (response.Success) {
          this.userProfile = response.Data;
          if(this.userProfile?.ProfileImg == null || this.userProfile?.ProfileImg == 'empty'){
            this.imagePreview = 'https://t3.ftcdn.net/jpg/03/46/83/96/240_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
          }else{
            this.imagePreview = this.userProfile?.ProfileImg || '';
          }
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
        // Email: this.userProfile.Email,
        // UserName: this.userProfile.UserName,
        PhoneNumber: this.userProfile.PhoneNumber,
        ProfileImg: this.imagePreview
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
      
      // Append form values (only allowed fields)
      formData.append('FirstName', formValue.FirstName);
      formData.append('LastName', formValue.LastName);
      formData.append('PhoneNumber', formValue.PhoneNumber);
      // Email and UserName are not sent

      // Append image if selected
      if (this.selectedImageFile) {
        formData.append('Image', this.selectedImageFile);
      }

      this.Service.updateProfile(formData, token).subscribe({
        next: (response) => {
          console.log(response);
          const msg = response.Message || '';
          if (response.Success || /success/i.test(msg)) {
            this.toastr.success('Profile updated successfully!', 'Success');
            // Update cookies for FullName and ProfileImg
            const fullName = formValue.FirstName + ' ' + formValue.LastName;
            this.cookies.set('FullName', fullName);
            if (response.Data && response.Data.ProfileImg) {
              this.cookies.set('Image', response.Data.ProfileImg);
            }
            this.loadUserProfile(); // Reload profile data
          } else {
            this.toastr.error('Failed to update profile: ' + msg);
          }
          this.isUpdating = false;
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.toastr.error('Failed to update profile. Please try again.');
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
