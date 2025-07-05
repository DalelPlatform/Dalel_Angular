// models/service-request.model.ts
export interface PaginatedResponse<T> {
  Data: {
    PageNumber: number;
    PageSize: number;
    TotalCount: number;
    Data: T[];
  };
  Success: boolean;
  Message: string;
  StatusCode: number;
}

export interface ServiceRequestDetails {
  Id: number;
  Title: string;
  ClientId: string;
  CategoryServicesId: number;
  Address: string;
  DueDate: string;
  CategoryName: string;
  Description: string;
  Date: string;
  Image: string;
  ClientName: string;
  StartPrice: number;
  Status: number; 
}