import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Proposal, ProposalStatus } from '../Models/proposal.model';
import { CommonModule } from '@angular/common';
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
  proposalStatus = ProposalStatus;
  onAction(action: string, id: number) {
    this.proposalAction.emit({action, id});
  }
}