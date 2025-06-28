import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from '../Services/provider.service';

@Component({
  selector: 'app-service-provider-profile',
  standalone: false,
  templateUrl: './service-provider-profile.component.html',
  styleUrl: './service-provider-profile.component.css'
})
export class ServiceProviderProfileComponent implements OnInit {
    profile: any;
  isLoading = true;

  constructor(private service: ServiceProviderService) {}

  ngOnInit(): void {
    this.service.getOwnProfile().subscribe({
      next: (res) => {
        if (res.Success) this.profile = res.Data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  edit(field: string) {
    console.log('Edit', field);
    // افتحي مودال أو انقلي لصفحة التعديل
  }
}
