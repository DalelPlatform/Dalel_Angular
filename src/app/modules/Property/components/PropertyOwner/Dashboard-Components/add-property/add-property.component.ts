import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PropertyOwnerService } from '../../../../../../Services/Property/property-owner.service';

@Component({
  selector: 'app-add-property',
  standalone:false,
  templateUrl: './add-property.component.html',
  styleUrl: './add-property.component.css'
})
export class AddPropertyComponent {
  propertyForm!: FormGroup;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('dropZone') dropZone!: ElementRef;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private propertyService: PropertyOwnerService,
  ) {
    this.initForm();
  }
  ngAfterViewInit(): void {
    this.setupDragAndDrop();
  }
  initForm() {
    this.propertyForm = this.fb.group({
      Description: [''],
      Amenities: [''],
      NumberOfRooms: [''],
      BuildingNo: [''],
      FloorNo: [''],
      Address: [''],
      City: [0],
      Region: [0],
      Street: [0],
      Latitude: [0],
      Longitude: [0],
      PhoneNumber: [0],
      CancelationOptions: [false],
      IsForRent: [false],
      VerificationStatus: [0],
      CancelationCharges: [0],
      PropertyImages: [''],
      OwnerId: [this.cookieService.get('Token')],

    });
  }

  setupDragAndDrop(): void {
    if (this.dropZone && this.dropZone.nativeElement) {
      const dropZoneElement = this.dropZone.nativeElement;

      dropZoneElement.addEventListener('dragover', (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneElement.classList.add('dragover');
      });

      dropZoneElement.addEventListener('dragleave', (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneElement.classList.remove('dragover');
      });

      dropZoneElement.addEventListener('drop', (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneElement.classList.remove('dragover');

        if (e.dataTransfer.files.length) {
          const files = e.dataTransfer.files;
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (this.isValidImageFile(file)) {
              this.selectedFiles.push(file);
              this.createImagePreview(file);
            }
          }
        }
      });
    }
  }

  triggerFileInput(): void {
    if (this.fileInput) {
      this.fileInput.nativeElement.click();
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (this.isValidImageFile(file)) {
          this.selectedFiles.push(file);
          this.createImagePreview(file);
        }
      }
    }
  }

  isValidImageFile(file: File): boolean {
    const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    return file && acceptedImageTypes.includes(file.type);
  }

  createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewUrls.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + ' KB';
    } else {
      return (size / (1024 * 1024)).toFixed(1) + ' MB';
    }
  }

  submit() {
    const token = this.cookieService.get('Token');
    const formData = new FormData();

    Object.keys(this.propertyForm.value).forEach(key => {
      const value = this.propertyForm.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });

    // Append files
    this.selectedFiles.forEach((file, index) => {
      formData.append(`PropertyPhotos[${index}]`, file, file.name);
    });
    this.propertyService.registerProperty(formData,token).subscribe({
      next: () => {
        alert("Property registered successfully!");
      },
      error: err => {
        console.error(err);
        alert("Failed to register Property.");
      }
    });
  }

}
