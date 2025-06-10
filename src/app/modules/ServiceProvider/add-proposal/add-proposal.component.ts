import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProposalService} from '../Services/proposal.service';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-add-proposal',
  standalone: false,
  templateUrl: './add-proposal.component.html',
  styleUrl: './add-proposal.component.css'
})
export class AddProposalComponent implements OnInit {
  proposalForm: FormGroup;
  isLoading = false;
  serviceRequestId: number = 0;

  constructor(
    private fb: FormBuilder,
    private proposalService: ProposalService,
    private route: ActivatedRoute,
    private router: Router,

    private toastr: ToastrService
  ) {
    this.proposalForm = this.fb.group({
      description: ['', [Validators.required, Validators.maxLength(500)]],
      suggestedPrice: ['', [Validators.required, Validators.min(0.01)]],
      serviceRequestId: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceRequestId = +params['requestId'];
      this.proposalForm.patchValue({
        serviceRequestId: this.serviceRequestId
      });
    });
  }
navigateToServiceRequest(): void {
  this.router.navigate(['/service-requests', this.serviceRequestId]);
}
  onSubmit(): void {
    if (this.proposalForm.invalid) {
      this.markFormGroupTouched(this.proposalForm);
      return;
    }

    this.isLoading = true;
    const proposalData = this.proposalForm.value;

    this.proposalService.createProposal(proposalData).subscribe({
      next: (response) => {
        this.toastr.success('Proposal submitted successfully!');
        this.router.navigate(['/service-requests', this.serviceRequestId]);
      },
      error: (err) => {
        this.isLoading = false;
        this.toastr.error(err.error?.message || 'Failed to submit proposal');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  get f() { return this.proposalForm.controls; }
}
