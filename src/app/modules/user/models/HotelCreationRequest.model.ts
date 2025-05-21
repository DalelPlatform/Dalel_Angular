export interface HotelCreationRequest {
    Name: string;
    Description: string;
    City: string;
    Street: string;
    Address: string;
    Latitude: number;
    Longitude: number;
    PhoneNumber: string;
    CancelationOptions: boolean;
    CancelationCharges: number;
    // OwnerId is set server-side from JWT, so omit here
    // Images will be handled via file upload separately
  }
  
  export interface ServiceResult<T = any> {
    Success: boolean;
    Message: string;
    StatusCode?: number;
    Data?: T;
  }
  