import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../Services/request.service';
import { ProposalService } from '../Services/proposal.service';
import { ServiceRequestDetails } from '../Models/service-request.model';
import { ServiceProviderService } from '../Services/provider.service';
import { CookieService } from 'ngx-cookie-service';
declare var bootstrap: any;


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
  showAddProposalForm = false;
  currentUserId: string = '';
  providerProfile: any;
  providerProfiles: { [key: string]: any } = {};
  selectedProposalId: number | null = null;


  newProposal = {
    description: '',
    suggestedPrice: null,
    date: new Date()
  };
  constructor(
    private route: ActivatedRoute,
    private requestService: RequestService,
    private proposalService: ProposalService,
    private cookieService: CookieService,
    private ServiceProviderService: ServiceProviderService


  ) {
    this.requestId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadRequestDetails();
    this.loadProposals();
    this.userRole = this.cookieService.get('Role');
    this.currentUserId = this.cookieService.get('Token');
    console.log('User Role:', this.userRole);
    this.isClient = this.userRole === 'Client';
    this.isServiceProvider = this.userRole === 'ServiceProvider';
    this.loadProviderProfile();

  }

  loadProviderProfile() {
    this.ServiceProviderService.getOwnProfile().subscribe({
      next: (res) => {
        this.providerProfile = res.Data;
        console.log("Provider profile loaded:", this.providerProfile);
      },
      error: (err) => {
        console.error("Error loading provider profile", err);
      }
    });
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
        this.isClient = this.userRole === 'Client' && this.request.ClientId == this.currentUserId;
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
  this.proposalService.getProposalsByRequest(this.requestId).subscribe({
    next: (response) => {
      this.proposals = response.Data;
      this.sortProposalsByDate();
      console.log('Proposals loaded:', this.proposals);
      this.proposals.forEach(proposal => {
        const providerId = proposal.ServiceProviderId;
        if (!this.providerProfiles[providerId]) {
          this.ServiceProviderService.getProviderById(providerId).subscribe({
            next: (res) => {
              if (res.Success) {
                this.providerProfiles[providerId] = res.Data;
              }
            },
            error: (err) => {
              console.error("Error loading provider profile for ID " + providerId, err);
            }
          });
        }
      });
    },
    error: (err) => {
      console.error('Error loading proposals:', err);
    }
  });
}


  onAddProposal(): void {
    this.showAddProposalForm = true;
  }
  cancelProposal(): void {
    this.showAddProposalForm = false;
    this.newProposal = {
      description: '',
      suggestedPrice: null,
      date: new Date()
    };
  }

  submitProposal(): void {
    const proposalData = {
      description: this.newProposal.description,
      suggestedPrice: this.newProposal.suggestedPrice,
      serviceRequestId: this.requestId
    };

    this.proposalService.createProposal(proposalData).subscribe({
      next: (res) => {
        console.log('Response from backend:', res);
        if (res.Success) {
          this.loadProposals();
          this.showAddProposalForm = false;
          this.newProposal = { description: '', suggestedPrice: null, date: new Date() };
        } else {
          alert('Failed to submit proposal: ' + res.Message);
        }
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Failed to submit proposal. Please Login again.');

      }
    });
  }

openConfirmModal(proposalId: number): void {
  this.selectedProposalId = proposalId;
  console.log(`Opening confirmation modal for proposal ID: ${proposalId}`);
  const modalEl = document.getElementById('confirmModal');
  if (modalEl) {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

confirmAccept(): void {
  if (this.selectedProposalId !== null) {
    this.proposalService.acceptProposal(this.selectedProposalId).subscribe({
      next: (res) => {
        if (res.Success) {
          this.loadProposals(); 
          this.selectedProposalId = null;
          console.log(this.selectedProposalId);
          
          const modalEl = document.getElementById('confirmModal');
          if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl);
            modal?.hide();
          }
        } else {
          alert('Faild To Accept the proposal ' + res.Message);
        }
      },
      error: (err) => {
        console.error('Error accepting proposal:', err);
        alert('Something went wrong while accepting the proposal. Please try again later.');
      }
    });
  }
}

}
