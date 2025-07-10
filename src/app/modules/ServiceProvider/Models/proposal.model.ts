export interface Proposal {
  Id: number;
  ServiceProviderId: string;
  SuggestedPrice: number;
  Date: Date;
  Description: string;
  ServiceRequestId: number;
  createdAt: Date;
  updatedAt?: Date;
  ClientId: string;
  Status: ProposalStatus;
}
export enum ProposalStatus {
  Pending = 1,
  Accepted = 2,
  Rejected = 3,
  Completed = 4,
  Cancelled = 5
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
