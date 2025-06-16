import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../Services/request.service';
import { ProposalService } from '../Services/proposal.service';
import { ServiceRequestDetails } from '../Models/service-request.model';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-request-details-component',
  standalone: false,
  templateUrl: './request-details-component.component.html',
  styleUrl: './request-details-component.component.css'
})
export class RequestDetailsComponent implements OnInit {
  request!: ServiceRequestDetails;
  requestId: number;
  proposals: any[] = [];
  isLoading = true;
  userRole: string = '';
  isClient: boolean = false;
  isServiceProvider: boolean = false;
  currentUserId: string = '';
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private proposalService: ProposalService,
    private cookieService: CookieService

  ) {
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadRequestDetails();
    this.loadProposals();
    this.userRole = this.cookieService.get('Role');
    this.currentUserId = this.cookieService.get('Token');

    this.isClient = this.userRole === 'Client';
    this.isServiceProvider = this.userRole === 'ServiceProvider';

  }
  sortProposalsByDate(): void {
    this.proposals.sort((a, b) => {
      return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    });
  }
  loadRequestDetails(): void {
    this.requestService.getRequestById(this.requestId).subscribe({
      next: (response) => {
        this.request = response.Data;
        console.log('Full response:', response);
        console.log('Data inside response:', response.Data);

        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading request details:', err);
        this.isLoading = false;
      }
    });
  }

  loadProposals(): void {
    this.proposalService.getProposalsByRequest(Number(this.requestId)).subscribe({
      next: (response) => {
        this.proposals = response.Data;
      },
      error: (err) => {
        console.error('Error loading proposals:', err);
      }
    });
  }
  onAddProposal(): void {
    // this.router.navigate(['/add-proposal', this.requestId]);
    console.log('Redirect to add proposal page');
  }

  acceptProposal(proposalId: number): void {
    console.log(`Accepting proposal with ID: ${proposalId}`);
  }

}
