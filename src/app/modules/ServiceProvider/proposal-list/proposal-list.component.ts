import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proposal, ProposalStatus } from '../Models/proposal.model';
import { ProposalService } from '../Services/proposal.service';

@Component({
  selector: 'app-proposal-list',
  standalone: false,
  templateUrl: './proposal-list.component.html',
  styleUrls: ['./proposal-list.component.css']
})
export class ProposalListComponent implements OnInit {
  constructor(private proposalService: ProposalService) { }
  proposalStatus = ProposalStatus;
  @Input() AllProposals: Proposal[] = [];
  Proposals: Proposal[] = [];
  filterStatus: string = '';
  searchTerm: string = '';
  sortOrder: string = 'newest';

  @Output() proposalAction = new EventEmitter<{ action: string, id: number }>();
  ngOnInit(): void {
    this.loadProposals();
  }
  loadProposals() {
    this.proposalService.getProposalsByProvider().subscribe({
      next: (data: any) => {
        this.AllProposals = data.Data.Data;
        this.applyFilters();
        
        console.log('Proposals loaded successfully:', this.AllProposals);
      },
      error: (error) => {
        console.error('Error loading proposals:', error);
      }
    });

  }
  applyFilters() {
  let filtered = [...this.AllProposals];

  if (this.searchTerm) {
    const term = this.searchTerm.toLowerCase();
    filtered = filtered.filter(p =>
      p.Description?.toLowerCase().includes(term) ||
      p.ServiceRequestId?.toString().includes(term)
    );
  }

  if (this.filterStatus) {
    filtered = filtered.filter(p =>
      this.getStatusLabel(p.Status).toLowerCase() === this.filterStatus.toLowerCase()
    );
  }

  if (this.sortOrder === 'newest') {
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (this.sortOrder === 'oldest') {
    filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  this.Proposals = filtered;
}

  onAction(action: string, id: number) {
    this.proposalAction.emit({ action, id });
  }
  getStatusLabel(status: ProposalStatus): string {
    switch (status) {
      case ProposalStatus.Pending:
        return 'Pending';
      case ProposalStatus.Accepted:
        return 'Accepted';
      case ProposalStatus.Rejected:
        return 'Rejected';
      case ProposalStatus.Completed:
        return 'Completed';
      case ProposalStatus.Cancelled:
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  }
}
