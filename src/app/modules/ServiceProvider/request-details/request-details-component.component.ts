import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../Services/request.service';
import { ProposalService } from '../Services/proposal.service';
import { ServiceRequestDetails } from '../Models/service-request.model';
import { ServiceProviderService } from '../Services/provider.service';
import { CookieService } from 'ngx-cookie-service';
import { Proposal } from '../Models/proposal.model';
import { ProposalStatus } from '../Models/proposal.model';
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
  proposals: Proposal[] = [];
  isLoading = true;
  userRole: string = '';
  isClient: boolean = false;
  isServiceProvider: boolean = false;
  showAddProposalForm = false;
  currentUserId: string = '';
  providerProfile: any;
  providerProfiles: { [key: string]: any } = {};
  selectedProposalId: number | null = null;
  usersDetails: { [key: string]: any } = {};
  categoryName: string = '';
  clientName: string = '';




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
    this.isClient = this.userRole === 'Client' && this.request.ClientId == this.currentUserId;
    this.isServiceProvider = this.userRole === 'ServiceProvider';
    this.loadProviderProfiles();


    this.userRole = this.cookieService.get('Role');
    this.isServiceProvider = this.userRole === 'ServiceProvider';

    this.loadProviderProfiles();
  }


  loadProviderProfiles(): void {

    const uniqueProviderIds = [...new Set(this.proposals.map(p => p.ServiceProviderId))];

    uniqueProviderIds.forEach(providerId => {
      if (!providerId) {
        console.warn('Missing providerId in proposal');
        return;
      }

      if (!this.providerProfiles[providerId]) {
        this.ServiceProviderService.getProviderById(providerId).subscribe({
          next: (res) => {
            if (res.Success) {
              this.providerProfiles[providerId] = res.Data;
            }
          },
          error: (err) => {
            console.log(`Error loading provider with ID ${providerId}:`, err);
          }
        });
      }
    });
  }



  sortProposalsByDate(): void {
    this.proposals.sort((a, b) => {
      if (a.Status === ProposalStatus.Accepted && b.Status !== ProposalStatus.Accepted) return -1;
      if (b.Status === ProposalStatus.Accepted && a.Status !== ProposalStatus.Accepted) return 1;
      return new Date(b.Date).getTime() - new Date(a.Date).getTime();
    });
  }

  isProposalAcceptDisabled(proposal: Proposal): boolean {
    const hasAccepted = this.proposals.some(p => p.Status === ProposalStatus.Accepted);
    return hasAccepted && proposal.Status !== ProposalStatus.Accepted;
  }



  loadRequestDetails(): void {
    this.requestService.getRequestById(this.requestId).subscribe({
      next: (response) => {
        this.request = response.Data;

         if (this.userRole === 'Client') {
        this.requestService.getOwnAccount().subscribe({
          next: (res) => {
            const currentClientId = res.Data.Id;
            this.isClient = this.request.ClientId === currentClientId;
          },
          error: (err) => {
            console.error("Error fetching client account:", err);
            this.isClient = false;
          }
        });
      }
        this.requestService.getClient(this.request.ClientId).subscribe({
          next: (res) => {
            this.clientName = res.Data.userName || res.Data.UserName || 'Unknown';
          },
          error: (err) => {
            console.error('Error fetching client name:', err);
            this.clientName = 'Unknown';
          }
        });

        this.requestService.getCatedoryById(this.request.CategoryServicesId).subscribe({
          next: (res) => {
            this.categoryName = res.Data.Name || 'Unknown';
          },
          error: (err) => {
            console.error('Error fetching category:', err);
            this.categoryName = 'Unknown';
          }
        });

        this.isClient = this.userRole === 'Client' && this.request.ClientId == this.currentUserId;

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
        if (res.Success) {
          this.loadProposals();
          this.showAddProposalForm = false;
          this.newProposal = { description: '', suggestedPrice: null, date: new Date() };
        } else {
          this.showModal("You have already submitted a proposal for this request.");
        }
      },
      error: (err) => {
        console.error('Error:', err);
        if (err.status === 400) {
          this.showModal("You have already submitted a proposal for this request.");
        } else if (err.status === 401 || err.status === 403) {
          this.showModal("Your session has expired. Please login again.");
        } else {
          this.showModal("Something went wrong. Please try again.");
        }
      }
    });

  }

  showModal(message: string): void {
    const modalEl = document.getElementById('infoModal');
    if (modalEl) {
      modalEl.querySelector('.modal-body')!.textContent = message;
      const modal = new bootstrap.Modal(modalEl);
      modal.show();
    }
  }

  openConfirmModal(proposalId: number): void {
    this.selectedProposalId = proposalId;
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
