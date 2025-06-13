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
  CategoryName?: string;//عاوزة امررها من الفرونت للباك
  Description: string;
  Date: string;
  Status: number; 
}