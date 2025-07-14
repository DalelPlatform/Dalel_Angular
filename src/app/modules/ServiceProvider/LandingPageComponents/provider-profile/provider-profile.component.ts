import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProvider } from "../../Models/serviceprovider.model"
import { ActivatedRoute } from '@angular/router';
import { ServiceProviderService } from '../../Services/provider.service';
import { scheduleItem } from '../../Models/schedule.model';

{ }
@Component({
  selector: 'app-provider-profile',
  standalone: false,
  templateUrl: './provider-profile.component.html',
  styleUrls: ['./provider-profile.component.css']
})
export class ProviderProfileComponent implements OnInit {
  userId: string | null = null;
  ID!: string;
  provider!: ServiceProvider
  schedule: scheduleItem[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private providerService: ServiceProviderService) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.userId = params.get('userId');
      // this.ID = this.userId?.toString()
      console.log('Received UserId:', this.userId);
      this.loadProviderById(this.userId);

    });
  }
  daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  startChat() {
    // Placeholder - ممكن تكمليه بعدين
    alert(`Start chat with ${this.provider?.UserName}`);
  }
  loadProviderById(id: string | null): void {
    if (!id) return;

    this.providerService.getProviderById(id).subscribe({
      next: (response) => {
        this.provider = response.Data || response; // حسب شكل الريسبونس من الـ API
        console.log('Loaded provider:', this.provider);
        this.loadSchedules(this.provider.UserId)

      },
      error: (err) => {
        console.error('Failed to load provider by ID', err);
      }
    });
  }
loadSchedules(id: string) {
  this.providerService.getSchedulesByProvider(id).subscribe({
    next: (res) => {
      this.schedule = res?.Data?.Data || res?.Data || [];
      console.log('Schedules:', this.schedule);
    },
    error: (err) => {
      console.error('Error loading schedules:', err);
    }
  });
}

}
