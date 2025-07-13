// import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js/auto';
// import { ChangeDetectorRef } from '@angular/core';
// import { Proposal, ProposalStatus } from '../Models/proposal.model';
// import { ProposalService } from '../Services/proposal.service';
// import { ServiceProviderService } from '../Services/provider.service';
// import { ServiceProvider } from '../Models/serviceprovider.model';
// import { scheduleItem } from '../Models/schedule.model';
// import { Toast, ToastrService } from 'ngx-toastr';
// import { FormBuilder, FormGroup } from '@angular/forms';
// declare var bootstrap: any;

// @Component({
//   selector: 'app-service-provider',
//   standalone: false,
//   templateUrl: './service-provider.component.html',
//   styleUrls: ['./service-provider.component.css']
// })
// export class ServiceProviderComponent implements OnInit {

//   providerProfile!: ServiceProvider;
//   selectedStatus: 'completed' | 'accepted' | 'rejected' | 'pending' = 'completed';
//   proposals: Proposal[] = [];
//   isUpdatingSchedule: boolean = false;
//   proposalCards: any[] = [];
//   schedules: scheduleItem[] = [];
//   chart: any;
//   providerId!: string;
//   scheduleForm!: FormGroup

//   constructor(
//     private proposalService: ProposalService,
//     private providerService: ServiceProviderService,
//     private cdr: ChangeDetectorRef,
//     private toastr: ToastrService,
//   ) { }

//   ngOnInit(): void {
//     this.loadProviderProfile();
//     this.loadProposals();

//     this.cdr.detectChanges();
//   }

//   loadProviderProfile(): void {
//     this.providerService.getOwnProfile().subscribe({
//       next: res => {
//         this.providerProfile = res.Data;
//         this.providerId = this.providerProfile.UserId;
//         console.log('Provider profile loaded:', this.providerProfile);
//       },
//       error: err => console.error('Profile load failed', err)
//     });
//   }

//   loadProposals(): void {
//     console.log('Fetching proposals...');
//     this.proposalService.getProposalsByProvider(100, 1).subscribe({
//       next: (res) => {
//         console.log('Response from API:', res.Data.Data);
//         this.proposals = res.Data.Data;
//         this.updateCards();
//         this.renderChart();
//       },
//       error: (err) => {
//         console.error('Failed to load proposals:', err);
//       }
//     });
//   }


//   updateCards(): void {
//     if (!this.proposals) return;

//     const completed = this.proposals.filter(p => p.Status === ProposalStatus.Completed).length;
//     const accepted = this.proposals.filter(p => p.Status === ProposalStatus.Accepted).length;
//     const rejected = this.proposals.filter(p => p.Status === ProposalStatus.Rejected).length;
//     const pending = this.proposals.filter(p => p.Status === ProposalStatus.Pending).length;

//     this.proposalCards = [
//       { key: 'completed', label: 'Completed', count: completed },
//       { key: 'accepted', label: 'Accepted', count: accepted },
//       { key: 'rejected', label: 'Rejected', count: rejected },
//       { key: 'pending', label: 'Pending', count: pending },
//     ];
//   }


//   get filteredProposals(): any[] {
//     if (this.selectedStatus === 'accepted') {
//       return this.proposals.filter(p => p.Status === ProposalStatus.Accepted);
//     } else if (this.selectedStatus === 'rejected') {
//       return this.proposals.filter(p => p.Status === ProposalStatus.Rejected);
//     } else if (this.selectedStatus === 'pending') {
//       return this.proposals.filter(p => p.Status === ProposalStatus.Pending);
//     }
//     if (this.selectedStatus === 'completed') {
//       return this.proposals.filter(p => p.Status === ProposalStatus.Completed);
//     }
//     return this.proposals;
//   }

//   onCardSelect(key: 'completed' | 'accepted' | 'rejected' | 'pending') {
//     this.selectedStatus = key;
//   }

//   renderChart(): void {
//     const data = this.proposalCards;
//     const ctx = document.getElementById('proposalPieChart') as HTMLCanvasElement;

//     if (this.chart) {
//       this.chart.destroy();
//     }

//     this.chart = new Chart(ctx, {
//       type: 'pie',
//       data: {
//         labels: data.map(d => d.label),
//         datasets: [
//           {
//             data: data.map(d => d.count),
//             backgroundColor: ['#0d6efd', '#28a745', '#dc3545', '#ffc107'],
//           }
//         ]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             position: 'bottom'
//           }
//         }
//       }
//     });
//   }
//   getDaysOfWeek() {
//     return [
//       { name: 'Sunday', value: 0 },
//       { name: 'Monday', value: 1 },
//       { name: 'Tuesday', value: 2 },
//       { name: 'Wednesday', value: 3 },
//       { name: 'Thursday', value: 4 },
//       { name: 'Friday', value: 5 },
//       { name: 'Saturday', value: 6 },
//     ];
//   }
//   isScheduleActive(dayValue: number): boolean {
//     return this.schedules?.some((schedule: scheduleItem) => schedule.WorkDay === dayValue) ?? false;
//   }
//   getScheduleForDay(dayValue: number): scheduleItem | undefined {
//     return this.schedules?.find((schedule: scheduleItem) => schedule.WorkDay === dayValue);
//   }
// openScheduleModal(): void {
//     this.scheduleModal = new bootstrap.Modal(document.getElementById('scheduleModal'));
//     // this.populateScheduleForm();
//   }
//   getSchedules(): void {
//     this.providerService.loadSchedules(this.providerId).subscribe({
//       next: (res) => {
//         if (res.Success) {
//           this.schedules = res.Data.Data;
//           this.toastr.success('Schedules loaded');
//           console.log(this.schedules);

//         } else {
//           this.toastr.error(res || 'Failed to load schedules');
//           console.log(res);


//         }
//       },
//       error: (err) => {
//         this.toastr.error('Failed to fetch schedules');
//         console.error(err);
//       }
//     });
//   }
//   updateSchedule(): void {
//     if (this.scheduleForm.invalid) return;

//     this.isUpdatingSchedule = true;

//     const updatedSchedule: any[] = [];

//     this.getDaysOfWeek().forEach(day => {
//       const key = day.name.toLowerCase();
//       const available = this.scheduleForm.get(${key}Available)?.value;
//       const startTime = this.scheduleForm.get(${key}StartTime)?.value;
//       const endTime = this.scheduleForm.get(${key}EndTime)?.value;

//       if (available && startTime && endTime) {
//         updatedSchedule.push({
//           WorKDay: day.value,
//           AvailableFrom: startTime,
//           AvailableTo: endTime,
//           ServiceProviderId: this.providerId
//         });
//       }
//     });

//     this.providerService.updateSchedule(updatedSchedule).subscribe({
//       next: (res) => {
//         this.isUpdatingSchedule = false;
//         this.toastr.success('Schedule updated successfully');
//         this.scheduleModal.hide();
//         this.getSchedules();
//       },
//       error: (err) => {
//         this.toastr.error(err.Message || 'Failed to update schedule');

//         this.isUpdatingSchedule = false;
//         this.toastr.error('Error occurred while updating schedule');
//         console.error(err);
//       }
//     });
//   }
// }
import { Component, OnInit, output } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChangeDetectorRef } from '@angular/core';
import { Proposal, ProposalStatus } from '../Models/proposal.model';
import { ProposalService } from '../Services/proposal.service';
import { ServiceProviderService } from '../Services/provider.service';
import { ServiceProvider } from '../Models/serviceprovider.model';
import { scheduleItem } from '../Models/schedule.model';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-service-provider',
  standalone: false,
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {

  providerProfile!: ServiceProvider;
  selectedStatus: 'completed' | 'accepted' | 'rejected' | 'pending' = 'completed';
  proposals: Proposal[] = [];
  isUpdatingSchedule: boolean = false;
  proposalCards: any[] = [];
  schedules: any[] = [];
  chart: any;
  providerId!: string;
  scheduleForm!: FormGroup;
  scheduleModal: any;

  constructor(
    private proposalService: ProposalService,
    private providerService: ServiceProviderService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.clear();
    this.loadProviderProfile();
    this.loadProposals();
    this.initScheduleForm();
    // this.cdr.detectChanges();
  }

  loadProviderProfile(): void {
    this.providerService.getOwnProfile().subscribe({
      next: res => {
        this.providerProfile = res.Data;
        this.providerId = this.providerProfile.UserId;
        this.schedules = this.providerProfile.Schedules;

        console.log('Provider profile loaded:', this.providerProfile);
        this.schedules = this.providerProfile.Schedules;
        console.log(this.schedules);
      },
      error: err => console.error('Profile load failed', err)
    });
  }
  viewReviews(providerId: string): void {
    this.router.navigate(['/ReviewList'], { queryParams: { providerId } });
  }


  loadProposals(): void {
    console.log('Fetching proposals...');
    this.proposalService.getProposalsByProvider(100, 1).subscribe({
      next: (res) => {
        console.log('Response from API:', res.Data.Data);
        const data = res.Data.Data;
        const isChanged = JSON.stringify(this.proposals) !== JSON.stringify(this.proposals);
        this.proposals = data;
        this.updateCards();
        if (isChanged)
          this.renderChart();
      },
      error: (err) => {
        console.error('Failed to load proposals:', err);
      }
    });
  }
  getDaysOfWeek() {
    return [
      { name: 'Sunday', value: 0 },
      { name: 'Monday', value: 1 },
      { name: 'Tuesday', value: 2 },
      { name: 'Wednesday', value: 3 },
      { name: 'Thursday', value: 4 },
      { name: 'Friday', value: 5 },
      { name: 'Saturday', value: 6 },
    ];
  }

  initScheduleForm(): void {
    const group: { [key: string]: FormControl } = {};

    this.getDaysOfWeek().forEach(day => {
      group[`${day.name}Available`] = new FormControl(false);
      group[`${day.name}StartTime`] = new FormControl('');
      group[`${day.name}EndTime`] = new FormControl('');
    });

    this.scheduleForm = this.fb.group({});

    this.getDaysOfWeek().forEach(day => {
      const dayName = day.name; // ex: 'Sunday'
      this.scheduleForm.addControl(`${dayName}Available`, this.fb.control(false));
      this.scheduleForm.addControl(`${dayName}StartTime`, this.fb.control(''));
      this.scheduleForm.addControl(`${dayName}EndTime`, this.fb.control(''));
    });

  }
  getDayName(dayValue: number): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayValue] || "Loading...";
  }

  updateCards(): void {
    if (!this.proposals) return;

    const completed = this.proposals.filter(p => p.Status === ProposalStatus.Completed).length;
    const accepted = this.proposals.filter(p => p.Status === ProposalStatus.Accepted).length;
    const rejected = this.proposals.filter(p => p.Status === ProposalStatus.Rejected).length;
    const pending = this.proposals.filter(p => p.Status === ProposalStatus.Pending).length;

    this.proposalCards = [
      { key: 'completed', label: 'Completed', count: completed },
      { key: 'accepted', label: 'Accepted', count: accepted },
      { key: 'rejected', label: 'Rejected', count: rejected },
      { key: 'pending', label: 'Pending', count: pending },
    ];
  }

  get filteredProposals(): any[] {
    if (this.selectedStatus === 'accepted') {
      return this.proposals.filter(p => p.Status === ProposalStatus.Accepted);
    } else if (this.selectedStatus === 'rejected') {
      return this.proposals.filter(p => p.Status === ProposalStatus.Rejected);
    } else if (this.selectedStatus === 'pending') {
      return this.proposals.filter(p => p.Status === ProposalStatus.Pending);
    }
    if (this.selectedStatus === 'completed') {
      return this.proposals.filter(p => p.Status === ProposalStatus.Completed);
    }
    return this.proposals;
  }


  onCardSelect(key: 'completed' | 'accepted' | 'rejected' | 'pending') {
    this.selectedStatus = key;
  }

  renderChart(): void {
    const data = this.proposalCards;
    const ctx = document.getElementById('proposalPieChart') as HTMLCanvasElement;

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(d => d.label),
        datasets: [{
          data: data.map(d => d.count),
          backgroundColor: ['#0d6efd', '#28a745', '#dc3545', '#ffc107'],
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }


}
