import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ServiceRequestService } from '../../services/service-request.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-add-service-request',
  standalone: false,
  templateUrl: './add-service-request.component.html',
  styleUrl: './add-service-request.component.css'
})
export class AddServiceRequestComponent implements OnInit {
  requestForm: FormGroup;
  isLoading = false;
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private serviceRequestService: ServiceRequestService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.requestForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      CategoryServicesId: ['', [Validators.required]], 
      preferredDate: ['', [Validators.required]],
      budget: ['', [Validators.required, Validators.min(0.01)]],
      address: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {  
      this.loadCategories();
    }
    
    loadCategories(): void {
    this.serviceRequestService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.Data; 
        console.log('Categories loaded:', response.Data);
      },
      error: (err) => {
        this.toastr.error('Failed to load categories');
      }
    });
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.requestForm.patchValue({
        images: files
      });
    }
  }

  onSubmit(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = new FormData();
    console.log(this.requestForm.value);
    Object.keys(this.requestForm.controls).forEach(key => {
      if (key === 'images') {
        const files = this.requestForm.get(key)?.value;
        if (files) {
          for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
          }
        }
      } else {
        formData.append(key, this.requestForm.get(key)?.value);
      }
    });

    this.serviceRequestService.createServiceRequest(formData)
      .subscribe({
        next: (response) => {
          this.toastr.success('Service request created successfully');
          this.router.navigate(['/service-requests']);
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Failed to create service request');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}