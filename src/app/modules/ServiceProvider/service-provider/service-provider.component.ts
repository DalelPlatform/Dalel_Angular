import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChangeDetectorRef } from '@angular/core';
import { Proposal, ProposalStatus } from '../Models/proposal.model';
import { ProposalService } from '../Services/proposal.service';
import { ServiceProviderService } from '../Services/provider.service';
import { ServiceProvider } from '../Models/serviceprovider.model';
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

  proposalCards: any[] = [];
  chart: any;

  constructor(
    private proposalService: ProposalService,
    private providerService: ServiceProviderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadProviderProfile();
    this.loadProposals();

    this.cdr.detectChanges();
  }

  loadProviderProfile(): void {
    this.providerService.getOwnProfile().subscribe({
      next: res => {
        this.providerProfile = res.Data;
        console.log('Provider profile loaded:', this.providerProfile);
      },
      error: err => console.error('Profile load failed', err)
    });
  }

  loadProposals(): void {
    console.log('Fetching proposals...');
    this.proposalService.getProposalsByProvider(100, 1).subscribe({
      next: (res) => {
        console.log('Response from API:', res.Data.Data);
        this.proposals = res.Data.Data;
        this.updateCards();
        this.renderChart();
      },
      error: (err) => {
        console.error('Failed to load proposals:', err);
      }
    });
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
        datasets: [
          {
            data: data.map(d => d.count),
            backgroundColor: ['#0d6efd', '#28a745', '#dc3545', '#ffc107'],
          }
        ]
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
