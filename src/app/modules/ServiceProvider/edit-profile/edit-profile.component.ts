import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceProviderService } from '../Services/provider.service';
import { ServiceProvider } from '../Models/serviceprovider.model';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompleteProfileServiceProviderService } from '../Services/CompleteProfileServiceProvider.Service'

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  providerProfile!: ServiceProvider;
  serviceProviderId!: string;
  imagePreview: string = '';
  selectedImageFile: File | null = null;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: ServiceProviderService,
    private toastr: ToastrService,
    private completeProfileService: CompleteProfileServiceProviderService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadCategories();
    this.loadProviderProfile();
  }

  initForm(): void {
    this.profileForm = this.fb.group({
      UserName: ['', Validators.required],
      About: [''],
      Address: [''],
      City: [''],
      District: [''],
      Country: [''],
      ZipCode: [''],
      ServiceArea: [''],
      CategoryServicesId: [null, Validators.required],
      Price: [0, Validators.required],
      PriceUnit: ['per_hour'],
      Website: [''],
      Image: [null]
    });
  }

  loadCategories(): void {
    this.completeProfileService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.Data;
        console.log('Categories loaded:', response.Data);
      },
      error: (err) => {
        this.toastr.error('Failed to load categories');
        console.error('Error loading categories:', err.message);
      }
    });
  }

  loadProviderProfile(): void {
    this.service.getOwnProfile().subscribe({
      next: (res) => {
        if (!res.Success) {
          this.toastr.error(res.Message || 'Failed to load profile');
          return;
        }
        this.providerProfile = res.Data;
        this.serviceProviderId = this.providerProfile.UserId;
        this.imagePreview = this.providerProfile.Image || '';
        console.log(this.providerProfile);

        this.profileForm.patchValue({
          UserName: this.providerProfile.UserName,
          About: this.providerProfile.About,
          Address: this.providerProfile.Address,
          City: this.providerProfile.City,
          District: this.providerProfile.District,
          Country: this.providerProfile.Country,
          ZipCode: this.providerProfile.ZipCode,
          ServiceArea: this.providerProfile.ServiceArea,
          CategoryServicesId: this.providerProfile.CategoryServicesId,
          Price: this.providerProfile.Price,
          PriceUnit: this.providerProfile.PriceUnit,
          Website: this.providerProfile.Website
        });
      },
      error: err => console.error('Profile load failed', err)
    });
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.profileForm.invalid) return;

    const formData = new FormData();

    formData.append('UserName', this.profileForm.value.UserName);
    formData.append('About', this.profileForm.value.About || '');
    formData.append('Address', this.profileForm.value.Address || '');
    formData.append('City', this.profileForm.value.City || '');
    formData.append('District', this.profileForm.value.District || '');
    formData.append('Country', this.profileForm.value.Country || '');
    formData.append('ZipCode', this.profileForm.value.ZipCode || '');
    formData.append('ServiceArea', this.profileForm.value.ServiceArea || '');
    formData.append('CategoryServicesId', this.profileForm.get('CategoryServicesId')?.value.toString());
    formData.append('Price', this.profileForm.get('Price')?.value || 0);
    formData.append('PriceUnit', this.profileForm.value.PriceUnit || '');
    formData.append('Website', this.profileForm.value.Website || '');

    if (this.selectedImageFile) {
      formData.append('Image', this.selectedImageFile);
    }
    
    console.log(formData.values());
    
    // Send the request
    this.service.updateServiceProvider(this.serviceProviderId, formData).subscribe({
      next: (res) => {
        if (res.Success) {
          this.toastr.success('Profile updated successfully!');
        } else {
          this.toastr.error(res.Message);
          console.log(res.Message);
        }
      },
      error: (err) => {
        this.toastr.error('Update failed');
        console.error(err);
        console.error('Validation Error:', err.error.errors);
      }
    });
  }
}