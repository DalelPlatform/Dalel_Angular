import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Proposal } from '../Models/proposal.model';
import { CommonModule } from '@angular/common';
import { TruncatePipe } from '../Pipes/truncate.pipe';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-proposal-list',
  standalone: false,
  templateUrl: './proposal-list.component.html',
  styleUrl: './proposal-list.component.css'
})
export class ProposalListComponent {
  @Input() proposals: Proposal[] = [];
  @Output() proposalAction = new EventEmitter<{action: string, id: number}>();

  getStatusClass(status: string): string {
    switch(status) {
      case 'Pending': return 'bg-warning text-dark';
      case 'Accepted': return 'bg-success text-white';
      case 'Rejected': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  }

  onAction(action: string, id: number) {
    this.proposalAction.emit({action, id});
  }
}