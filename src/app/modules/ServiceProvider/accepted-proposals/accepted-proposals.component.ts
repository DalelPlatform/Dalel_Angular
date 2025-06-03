import { Component, Input } from '@angular/core';
import { ProposalWithRating } from '../proposal.model';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-accepted-proposals',
  standalone: false,
  templateUrl: './accepted-proposals.component.html',
  styleUrl: './accepted-proposals.component.css'
})
export class AcceptedProposalsComponent {
  @Input() proposals: ProposalWithRating[] = [];
}
