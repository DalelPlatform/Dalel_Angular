export interface Proposal {
  id: number;
  serviceProviderId: string;
  suggestedPrice: number;
  description: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  serviceRequestId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface ProposalStats {
  totalProposals: number;
  acceptedProposals: number;
  averageRating: number;
}

export interface ProposalWithRating extends Proposal {
  rating?: {
    value: number;
    comment: string;
    createdAt: Date;
    clientName: string;
  };
}
