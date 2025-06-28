import { Component, OnInit } from '@angular/core';
import { ProposalService } from '../Services/proposal.service';
export interface ServiceProvider {
  id: string;
  name: string;
  email: string;
  category: string;
  profileImage: string;
  phone?: string;
  address?: string;
  bio?: string;
  rating?: number;
  joinDate?: string;
}

@Component({
  selector: 'app-service-provider',
  standalone: false,
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.css']
})
export class ServiceProviderComponent implements OnInit {
  activeTab: 'all' | 'accepted' = 'all';
  stats: any = {
    totalProposals: 0,
    acceptedProposals: 0,
    pendingProposals: 0,
    rejectedProposals: 0,
    averageRating: 0
  };
  proposals: any[] = [];
  acceptedProposals: any[] = [];
  isLoading = true;
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(
    private proposalService: ProposalService,
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loadStats();
    this.loadProposals();
  }

  loadStats(): void {
    this.proposalService.getProviderStats().subscribe({
      next: (res) => {
        this.stats = res.data; 
        console.log('Provider Stats:', this.stats);
        
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load stats:', err);
        this.isLoading = false;
      }
    });
  }

  loadProposals(): void {
    this.isLoading = true;
    this.proposalService.getProposalsByProvider(this.pageSize, this.currentPage)
      .subscribe({
        next: (res) => {
          this.proposals = res.data;
          this.totalItems = res.totalCount;
          this.filterProposals();
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Failed to load proposals:', err);
          this.isLoading = false;
        }
      });
  }

  filterProposals(): void {
    this.acceptedProposals = this.proposals.filter(
      (p) => p.status === 'Accepted'
    );
  }

  onTabChange(tab: 'all' | 'accepted'): void {
    this.activeTab = tab;
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProposals();
  }

  handleProposalAction(event: { action: string; id: number }): void {
    switch (event.action) {
      case 'delete':
        this.deleteProposal(event.id);
        break;
      case 'view':
        // عرض التفاصيل
        break;
    }
  }

  deleteProposal(id: number): void {
    if (confirm('Are you sure you want to delete this proposal?')) {
      this.proposalService.deleteProposal(id).subscribe({
        next: () => {
          this.loadData();
        },
        error: (err) => console.error('Failed to delete proposal:', err)
      });
    }
  }
}